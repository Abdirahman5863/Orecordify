import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaClient';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const category = searchParams.get('category');
    const priority = searchParams.get('priority');
    const tag = searchParams.get('tag');

    const customers = await prisma.customer.findMany({
      where: {
        userId: dbUser.id,
        ...(status && { status }),
        ...(type && { type }),
        ...(category && { category }),
        ...(priority && { priority }),
        ...(tag && { tags: { has: tag } }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        notes: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
        orders: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json({ error: 'Error fetching customers' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const customerCount = await prisma.customer.count({
      where: { userId: dbUser.id },
    });
    const customerId = `CUST-${String(customerCount + 1).padStart(3, '0')}`;

    const body = await request.json();
    const { name, phone, type = 'regular', category = 'personal', priority, tags = [] } = body;

    const newCustomer = await prisma.customer.create({
      data: {
        customerId,
        name,
        phone,
        type,
        category,
        priority,
        tags,
        userId: dbUser.id,
      },
    });

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error('Error creating customer:', error);
    if (error === 'P2002') {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Error creating customer' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    const customer = await prisma.customer.findFirst({
      where: {
        id,
        userId: dbUser.id,
      },
    });

    if (!customer) {
      return NextResponse.json({ error: "Customer not found or unauthorized" }, { status: 404 });
    }

    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.error('Error updating customer:', error);
    return NextResponse.json({ error: 'Error updating customer' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Customer ID is required' }, { status: 400 });
    }

    const customer = await prisma.customer.findFirst({
      where: {
        id,
        userId: dbUser.id,
      },
    });

    if (!customer) {
      return NextResponse.json({ error: "Customer not found or unauthorized" }, { status: 404 });
    }

    await prisma.customer.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    return NextResponse.json({ error: 'Error deleting customer' }, { status: 500 });
  }
}