import { prisma } from '@/lib/prismaClient';
import { NextRequest, NextResponse } from 'next/server';
import { getAuth, currentUser } from '@clerk/nextjs/server';
import { v4 as uuidv4 } from 'uuid';

// GET route to fetch customers
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

    const customers = await prisma.customer.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json({ error: 'Error fetching customers' }, { status: 500 });
  }
}

// POST route to create a new customer

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      const user = await currentUser();
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      dbUser = await prisma.user.create({
        data: {
          clerkId: userId,
          firstName: user.firstName ?? '',
          lastName: user.lastName ?? '',
          email: user.emailAddresses[0]?.emailAddress ?? '',
        },
      });
    }

    const body = await request.json() as { name: string; email: string; phone: string };
    const { name, email, phone } = body;

    // Generate a unique customer ID
    const customerId = `CUST-${dbUser.id.slice(0, 8)}-${uuidv4().slice(0, 8)}`;

    const newCustomer = await prisma.customer.create({
      data: {
        id: customerId,
        name,
        email,
        phone,
        userId: dbUser.id,
        totalOrders: 0,
        totalSpent: 0,
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
// PUT route to update customer details
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

    const customer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!customer || customer.userId !== dbUser.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.error('Error updating customer:', error);
    return NextResponse.json({ error: 'Error updating customer' }, { status: 500 });
  }
}

// DELETE route to remove a customer
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

    const customer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!customer || customer.userId !== dbUser.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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