import { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

export default function PayPalUpgrade() {
  const [isPaid, setIsPaid] = useState(false);

  const createOrder = async () => {
    try {
      const response = await fetch('/api/payments/paypal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const order = await response.json();
      return order.id;
    } catch (error) {
      console.error('Error creating PayPal order:', error);
    }
  };

  const onApprove = async (data: any) => {
    try {
      const response = await fetch(`/api/payments/paypal?orderId=${data.orderID}`, {
        method: 'GET',
      });
      const result = await response.json();
      if (result.message === 'Payment successful, account upgraded') {
        setIsPaid(true);
      }
    } catch (error) {
      console.error('Error capturing PayPal order:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Upgrade to Premium</h2>
      {isPaid ? (
        <p className="text-green-600 font-semibold">Thank you for upgrading!</p>
      ) : (
        <>
          <p className="mb-4">Unlock unlimited orders for just $9.99/month</p>
          <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
        </>
      )}
    </div>
  );
}