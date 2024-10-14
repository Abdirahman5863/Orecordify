import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../../utils/supabaseClient';
// import { supabase } from '../../../utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { customerName, email, address, phone, productName, quantity, orderStatus, notes } = req.body;

  try {
    // Insert customer data into the `customers` table
    const { data: customerData, error: customerError } = await supabase
      .from('customers')
      .insert({
        name: customerName,
        email,
        address,
        phone,
      })
      .select()
      .single();

    if (customerError) {
      throw new Error(customerError.message);
    }

    // Insert order data into the `orders` table using the customer ID
    const { error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_id: customerData.id,
        product_name: productName,
        quantity,
        order_status: orderStatus,
        notes,
      });

    if (orderError) {
      throw new Error(orderError.message);
    }

    return res.status(200).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Error creating order', error: error.message });
  }
}
