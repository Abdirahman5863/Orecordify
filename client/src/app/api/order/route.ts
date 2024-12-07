import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prismaClient';
import { getAuth, currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prismaClient';

interface OrderRequestBody {
  customerId: string;
  customerName: string;
  status: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
}

// Fetch all orders for the authenticated user
export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        user: { id: userId },
      },
      include: {
        customer: true,
        items: {
          include: {
            inventory: true,
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

// Create a new order
export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json() as OrderRequestBody;
    const { customerId, customerName, status, items, totalAmount } = body;

    if (!customerId) {
      return NextResponse.json({ error: 'Customer ID is required' }, { status: 400 });
    }

    // Ensure the user exists in your database
    let dbUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!dbUser) {
      const user = await currentUser();
      if (!user) throw new Error('User not found in Clerk');

      dbUser = await prisma.user.create({
        data: {
          id: userId,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.emailAddresses[0]?.emailAddress || '',
        },
      });
    }

    // Create or update the customer
    const customer = await prisma.customer.upsert({
      where: { id: customerId },
      update: {},
      create: {
       customerId: customerId,
        name: customerName,
        phone: '1234567890',
        type:'regular',
        category:'personal',
        priority:'medium',
        tags:[],
        userId: dbUser.id,
      },
    });

    // Generate a new order number
    const orderCount = await prisma.order.count();
    const orderNumber = `OD${String(orderCount + 1).padStart(4, '0')}`;

    // Validate inventory and update quantities
    const updatedItems = [];
    for (const item of items) {
      const inventoryItem = await prisma.inventoryItem.findFirst({
        where: { name: item.name, userId: dbUser.id },
      });

      if (!inventoryItem) {
        return NextResponse.json(
          { error: `Inventory item "${item.name}" not found.` },
          { status: 400 }
        );
      }

      if (inventoryItem.quantity < item.quantity) {
        return NextResponse.json(
          { error: `Not enough quantity for "${item.name}". Available: ${inventoryItem.quantity}` },
          { status: 400 }
        );
      }

      // Reduce the inventory quantity
      await prisma.inventoryItem.update({
        where: { id: inventoryItem.id },
        data: {
          quantity: inventoryItem.quantity - item.quantity,
        },
      });

      updatedItems.push({
        name: item.name,
        quantity: item.quantity,
        priceAtTime: item.price,
        inventoryId: inventoryItem.id, // Link the existing inventory item
      });
    }

    // Create the order
    const newOrder = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerId: customer.id,
        totalAmount,
        status,
        paymentStatus: 'pending',
        userId: dbUser.id,
        items: {
          create: updatedItems, // Use updated inventory references
        },
      },
      include: {
        items: true,
        customer: true,
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}

// Update an order's status
export async function PUT(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = await request.json() as { id: string; status: string };

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        items: {
          include: {
            inventory: true,
          },
        },
        customer: true,
      },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Error updating order' }, { status: 500 });
  }
}

// Delete an order
export async function DELETE(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const existingOrder = await prisma.order.findUnique({ where: { id } });
    if (!existingOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    await prisma.orderItem.deleteMany({
      where: { orderId: id },
    });

    await prisma.order.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json({ error: 'Error deleting order' }, { status: 500 });
  }
}
