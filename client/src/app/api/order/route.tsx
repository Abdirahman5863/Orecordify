import { NextRequest, NextResponse } from 'next/server';
import  prisma  from '@/lib/prismaClient';
import { getAuth, currentUser } from '@clerk/nextjs/server';

interface OrderRequestBody {
  customerId: string;
  customerName: string;
  status: string;
  items: {
    productName: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
}

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        user: { clerkId: userId },
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

    let dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      const user = await currentUser();
      if (!user) throw new Error('User not found in Clerk');

      dbUser = await prisma.user.create({
        data: {
          clerkId: userId,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.emailAddresses[0]?.emailAddress || '',
        },
      });
    }

    const customer = await prisma.customer.upsert({
      where: { id: customerId },
      update: {},
      create: {
        name: customerName,
        email: "",  // Set to the actual email if required
        phone: "",
        userId: dbUser.id  // Set to the actual phone if required
      },
    });

    const orderCount = await prisma.order.count();
    const orderNumber = `OD${String(orderCount + 1).padStart(4, '0')}`;

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
          create: items.map(item => ({
            quantity: item.quantity,
            priceAtTime: item.price,
            inventory: {
              create: {
                name: item.productName,
                sku: `SKU${Date.now()}`,
                category: 'default',
                quantity: item.quantity,
                price: item.price,
                userId: dbUser.id,
              },
            },
          })),
        },
      },
      include: {
        items: {
          include: {
            inventory: true,
          },
        },
        customer: true,
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}

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
