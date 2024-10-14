// import { NextApiRequest, NextApiResponse } from 'next';
// import { supabase } from '../../utils/supabaseClient';

// export async function getOrders(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const { data, error } = await supabase
//       .from('Orders')
//       .select('*');

//     if (error) throw error;

//     res.status(200).json(data);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Error fetching orders' });
//   }
// }



// export  async function getOrderById(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.query;

//   try {
//     const { data, error } = await supabase
//       .from('Orders')
//       .select('*')
//       .eq('id', id)
//       .single();

//     if (error) throw error;

//     res.status(200).json(data);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Error fetching order' });
//   }
// }
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export async function createOrder(formData: { orderDescription: string; status: string; total: number; customerId?: number; }) {
//     // Destructure formData to get necessary fields
//     const { customerId, orderDescription, status = 'pending', total } = formData;
    
//     try {
//       // Insert order data into the 'orders' table
//       const { data, error } = await supabase
//         .from('orders')  // Ensure this matches your actual table name in Supabase
//         .insert([{ 
//           customer_id: customerId, 
//           order_description: orderDescription, 
//           status, 
//           total 
//         }])
//         .select();  // Optional: Select the inserted row for return data
  
//       if (error) {
//         throw error;  // Catch any Supabase insert error
//       }
  
//       // Return success response if the order was created successfully
//       return {
//         success: true,
//         message: "Order created successfully",
//         order: data, // Return the created order (optional)
//       };
  
//     } catch (error) {
//       console.log(error);  // Log the error for debugging
  
//       // Return an error response
//       return {
//         success: false,
//         message: "Error creating order",
//       };
//     }
//   }
//   export default async function updateOrder(req: NextApiRequest, res: NextApiResponse) {
//     const { id } = req.query;
//     const updates = req.body;
  
//     try {
//       const { data, error } = await supabase
//         .from('Orders')
//         .update(updates)
//         .eq('id', id);
  
//       if (error) throw error;
  
//       res.status(200).json(data);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ error: 'Error updating order' });
//     }
//   }
  

// export  async function deleteOrder(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.query;

//   try {
//     const { error } = await supabase
//       .from('Orders')
//       .delete()
//       .eq('id', id);

//     if (error) throw error;

//     res.status(200).json({ message: 'Order deleted successfully' });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Error deleting order' });
//   }
// }
// export async function createcustomer(customerformData: { customer_name: string; customer_phone: string; customer_email: string; }) {
//     // Destructure formData to get necessary fields
//     const{ customer_name, customer_email, customer_phone} = customerformData;
    
//     try {
//       // Insert order data into the 'orders' table
//       const { data, error } = await supabase
//         .from('Customers')  // Ensure this matches your actual table name in Supabase
//         .insert([{ 
           
//           name:customer_name, 
//         email:customer_email, 
//           phone:customer_phone
//         }])
//         .select();  // Optional: Select the inserted row for return data
  
//       if (error) {
//         throw error;  // Catch any Supabase insert error
//       }
  
//       // Return success response if the order was created successfully
//       return {
//         success: true,
//         message: "customer created successfully",
//         order: data, // Return the created order (optional)
//       };
  
//     } catch (error) {
//       console.log(error);  // Log the error for debugging
  
//       // Return an error response
//       return {
//         success: false,
//         message: "Error creating customer",
//       };
//     }}