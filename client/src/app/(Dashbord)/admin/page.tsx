"use client"

import { motion } from 'framer-motion'
import { Users, ShoppingBag, AlertCircle, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const stats = [
  { name: 'Total Customer', value: '0', icon: Users },
  { name: 'Pending Orders', value: '0', icon: ShoppingBag },
  { name: 'Total Orders', value: '0', icon: ShoppingBag },
  { name: 'Issues Reported', value: '0', icon: AlertCircle },
]

const sections = [
  { name: 'Customer Management', description: 'Manage and view Customers', link: '/customers', linkText: 'Go to Customers' },
  { name: 'Order Management', description: 'Manage customer orders', link: '/orders', linkText: 'Go to Orders' },
  { name: 'Settings', description: 'Connect your WhatsApp account', link: '/settings', linkText: 'Go to Settings' },
  { name: 'Reported Issues', description: 'View reported issues by users', link: '/issues', linkText: 'View Issues' },
]

export default function Dashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-4">
        {stats.map((item) => (
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
        ))}
      </div>

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
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}