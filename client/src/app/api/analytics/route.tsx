/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import prisma  from '@/lib/prismaClient';
import { getAuth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '6M'; // Default to 6 months

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    switch (range) {
      case '1M':
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case '3M':
        startDate.setMonth(endDate.getMonth() - 3);
        break;
      case '6M':
        startDate.setMonth(endDate.getMonth() - 6);
        break;
      case '1Y':
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
    }

    // Get analytics data
    const analyticsData = await prisma.analytics.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    // Get orders data for the period
    const orders = await prisma.order.findMany({
      where: {
        user: { clerkId: userId },
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        items: {
          include: {
            inventory: true,
          },
        },
      },
    });

    // Calculate current period metrics
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Calculate order status distribution
    const orderStatus = {
      completed: orders.filter(order => order.status === 'completed').length,
      pending: orders.filter(order => order.status === 'pending').length,
      canceled: orders.filter(order => order.status === 'canceled').length,
    };

    // Get customers data
    const customers = await prisma.customer.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // Calculate top products
    const productSales = new Map();
    orders.forEach(order => {
      order.items.forEach(item => {
        const currentSales = productSales.get(item.inventory.name) || 0;
        productSales.set(item.inventory.name, currentSales + (item.quantity * item.priceAtTime));
      });
    });

    const topProducts = Array.from(productSales.entries())
      .map(([name, sales]) => ({ name, sales }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);

    // Get previous period metrics for comparison
    const previousStartDate = new Date(startDate);
    const previousEndDate = new Date(startDate);
    switch (range) {
      case '1M':
        previousStartDate.setMonth(previousStartDate.getMonth() - 1);
        break;
      case '3M':
        previousStartDate.setMonth(previousStartDate.getMonth() - 3);
        break;
      case '6M':
        previousStartDate.setMonth(previousStartDate.getMonth() - 6);
        break;
      case '1Y':
        previousStartDate.setFullYear(previousStartDate.getFullYear() - 1);
        break;
    }

    const previousOrders = await prisma.order.findMany({
      where: {
        user: { clerkId: userId },
        createdAt: {
          gte: previousStartDate,
          lte: previousEndDate,
        },
      },
    });

    const previousRevenue = previousOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const revenueChange = previousRevenue > 0 
      ? ((totalRevenue - previousRevenue) / previousRevenue) * 100 
      : 100;

    const orderChange = previousOrders.length > 0 
      ? ((totalOrders - previousOrders.length) / previousOrders.length) * 100 
      : 100;

    const previousCustomers = await prisma.customer.count({
      where: {
        createdAt: {
          gte: previousStartDate,
          lte: previousEndDate,
        },
      },
    });

    const customerChange = previousCustomers > 0 
      ? ((customers.length - previousCustomers) / previousCustomers) * 100 
      : 100;

    const previousAverageOrder = previousOrders.length > 0 
      ? previousOrders.reduce((sum, order) => sum + order.totalAmount, 0) / previousOrders.length 
      : 0;

    const averageOrderChange = previousAverageOrder > 0 
      ? ((averageOrderValue - previousAverageOrder) / previousAverageOrder) * 100 
      : 100;

    // Format response data
    const response = {
      summary: {
        totalRevenue: {
          value: totalRevenue,
          change: revenueChange,
        },
        totalOrders: {
          value: totalOrders,
          change: orderChange,
        },
        newCustomers: {
          value: customers.length,
          change: customerChange,
        },
        averageOrderValue: {
          value: averageOrderValue,
          change: averageOrderChange,
        },
      },
      orderStatus,
      topProducts,
      revenueData: analyticsData.map(data => ({
        month: new Date(data.date).toLocaleString('default', { month: 'short' }),
        revenue: data.totalRevenue,
      })),
      customerData: analyticsData.map(data => ({
        month: new Date(data.date).toLocaleString('default', { month: 'short' }),
        newCustomers: data.newCustomers,
      })),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Error fetching analytics' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get today's orders
    const orders = await prisma.order.findMany({
      where: {
        user: { clerkId: userId },
        createdAt: {
          gte: today,
        },
      },
      include: {
        items: {
          include: {
            inventory: true,
          },
        },
      },
    });

    // Calculate metrics
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    // Get new customers today
    const newCustomers = await prisma.customer.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    });

    // Calculate top products
    const productSales = new Map();
    orders.forEach(order => {
      order.items.forEach(item => {
        const currentSales = productSales.get(item.inventory.name) || 0;
        productSales.set(item.inventory.name, currentSales + (item.quantity * item.priceAtTime));
      });
    });

    const topProducts = Array.from(productSales.entries())
      .map(([name, sales]) => ({ name, sales }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);

    // Get low stock alerts
    const lowStockItems = await prisma.inventoryItem.findMany({
      where: {
        user: { clerkId: userId },
        quantity: {
          lte: 10, // Default threshold
        },
      },
    });

    // Update or create analytics record for today
    const analytics = await prisma.analytics.upsert({
      where: {
        date: today,
      },
      update: {
        totalOrders,
        totalRevenue,
        newCustomers,
        topProducts: topProducts as any,
        inventoryAlerts: lowStockItems as any,
        updatedAt: new Date(),
      },
      create: {
        date: today,
        totalOrders,
        totalRevenue,
        newCustomers,
        topProducts: topProducts as any,
        inventoryAlerts: lowStockItems as any,
      },
    });

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Error updating analytics:', error);
    return NextResponse.json({ error: 'Error updating analytics' }, { status: 500 });
  }
}