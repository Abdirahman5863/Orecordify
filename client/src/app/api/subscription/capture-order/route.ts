import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from "@clerk/nextjs/server";
import { prisma } from '@/lib/prismaClient';

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { orderId } = await request.json();

    // Capture PayPal order
    const response = await fetch(
      `${process.env.PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`,
        },
      }
    );

    const captureData = await response.json();

    if (captureData.status === 'COMPLETED') {
      // Update subscription in database
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      const subscription = await prisma.subscription.update({
        where: {
          userId: userId,
        },
        data: {
          status: 'active',
          currentPeriodEnd: nextMonth,
        },
      });

      return NextResponse.json(subscription);
    }

    throw new Error('Payment not completed');
  } catch (error) {
    console.error('Error capturing PayPal order:', error);
    return NextResponse.json(
      { error: 'Failed to capture payment' },
      { status: 500 }
    );
  }
}