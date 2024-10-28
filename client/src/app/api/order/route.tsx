import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaClient';
import { getAuth, currentUser } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const orders = await prisma.order.findMany({
      where: {
        user: { clerkId: userId }, },
      include: {
        user: {
          select: {
            firstName: true,
            email: true,
          },
        },
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Error fetching orders' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);
  const { customerName, productName, quantity, price, status, notes } = await request.json() as {
    customerName: string;
    productName: string;
    quantity: number;
    price: number;
    status: string;
    notes?: string;
  };

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Ensure the user exists in the database
    let dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      // Fetch Clerk user details if the user does not exist
      const user = await currentUser();
      if (!user) throw new Error('User not found in Clerk');
      
      dbUser = await prisma.user.create({
        data: {
          clerkId: user.id,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.emailAddresses[0]?.emailAddress || '',
        },
      });
    }

    const newOrder = await prisma.order.create({
      data: {
        customerName,
        productName,
        quantity,
        price,
        status,
        notes,
        user: { connect: { id: dbUser.id } },
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json() as { id: string } & Partial<{
      customerName: string;
      productName: string;
      quantity: number;
      price: number;
      status: string;
      notes?: string;
    }>;
    
    const { id, ...updateData } = body;

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Error updating order' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    await prisma.order.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json({ error: 'Error deleting order' }, { status: 500 });
  }
}
