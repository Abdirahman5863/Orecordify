import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaClient';
import { getAuth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const inventory = await prisma.inventoryItem.findMany({
      where: {
        userId: user.id,
      },
      include: {
        notes: true,
        orderItems: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(inventory);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json({ error: 'Error fetching inventory' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const {
      name,
      description,
      category,
      quantity,
      price,
      reorderPoint,
    } = await request.json();

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get the count of existing items in this category
    const itemCount = await prisma.inventoryItem.count({
      where: {
        userId: user.id,
        category,
      },
    });

    // Generate SKU: Category prefix (3 chars) + Sequential number (3 digits) + Random suffix (2 chars)
    const categoryPrefix = category.substring(0, 3).toUpperCase();
    const sequentialNumber = String(itemCount + 1).padStart(3, '0');
    const randomSuffix = Math.random().toString(36).substring(2, 4).toUpperCase();
    const sku = `${categoryPrefix}${sequentialNumber}${randomSuffix}`;

    const item = await prisma.inventoryItem.create({
      data: {
        name,
        sku,
        description,
        category,
        quantity,
        price,
        reorderPoint: reorderPoint || 10,
        userId: user.id,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Error creating inventory item:', error);
    return NextResponse.json({ error: 'Error creating inventory item' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, name, description, category, quantity, price, reorderPoint } = await request.json();

    // Verify user owns this item
    const existingItem = await prisma.inventoryItem.findFirst({
      where: {
        id,
        user: {
          clerkId: userId,
        },
      },
    });

    if (!existingItem) {
      return NextResponse.json({ error: "Item not found or unauthorized" }, { status: 404 });
    }

    // Only update allowed fields
    const item = await prisma.inventoryItem.update({
      where: { id },
      data: {
        name,
        description,
        category,
        quantity,
        price,
        reorderPoint,
      },
    });

    // If quantity is updated and falls below reorderPoint, create a notification or alert
    if (quantity <= item.reorderPoint) {
      console.log(`Low stock alert for ${item.name}: ${quantity} units remaining`);
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error updating inventory item:', error);
    return NextResponse.json({ error: 'Error updating inventory item' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Inventory ID is required' }, { status: 400 });
    }

    // Verify user owns this item
    const existingItem = await prisma.inventoryItem.findFirst({
      where: {
        id,
        user: {
          clerkId: userId,
        },
      },
    });

    if (!existingItem) {
      return NextResponse.json({ error: "Item not found or unauthorized" }, { status: 404 });
    }

    await prisma.inventoryItem.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    return NextResponse.json({ error: 'Error deleting inventory item' }, { status: 500 });
  }
}