/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ShoppingBag, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [lowStockItems, setLowStockItems] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch stats from the respective endpoints
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total customers
        const customersResponse = await fetch('/api/customer');
        const customersData = await customersResponse.json();
        setTotalCustomers(customersData.length);

        // Fetch total and pending orders
        const ordersResponse = await fetch('/api/order');
        const ordersData = await ordersResponse.json();
        setTotalOrders(ordersData.length);
        const pending = ordersData.filter((order: any) => order.status === 'pending').length;
        setPendingOrders(pending);

        // Fetch low stock inventory
        const inventoryResponse = await fetch('/api/inventory');
        const inventoryData = await inventoryResponse.json();
        const lowStock = inventoryData.filter((item: any) => item.quantity < 10).length;
        setLowStockItems(lowStock);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Stats data for rendering
  const stats = [
    { name: 'Total Customers', value: totalCustomers, icon: Users },
    { name: 'Pending Orders', value: pendingOrders, icon: ShoppingBag },
    { name: 'Total Orders', value: totalOrders, icon: ShoppingBag },
    { name: 'Low Stock Items', value: lowStockItems, icon: AlertTriangle },
  ];

  // Sections for the dashboard
  const sections = [
    { name: 'Customer Management', description: 'Manage and view Customers', link: '/customer', linkText: 'Go to Customers' },
    { name: 'Order Management', description: 'Manage customer orders', link: '/order', linkText: 'Go to Orders' },
    { name: 'Inventory Management', description: 'Manage and View Stocks', link: '/inventory', linkText: 'Go to Inventory' },
    { name: 'Notes Taking', description: 'Take down Notes', link: '/note', linkText: 'Go to Note' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          stats.map((item) => (
            <motion.div
              key={item.name}
              className="bg-[#F5F5DC] rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-700">{item.name}</h2>
                <item.icon className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{item.value}</p>
            </motion.div>
          ))
        )}
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {sections.map((section, index) => (
          <motion.div
            key={section.name}
            className="bg-[#F5F5DC] rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{section.name}</h2>
            <p className="text-gray-600 mb-4">{section.description}</p>
            <Link
              href={section.link}
              className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors duration-200"
            >
              {section.linkText}
              <ShoppingBag className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
