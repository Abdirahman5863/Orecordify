/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, ArrowUpRight } from 'lucide-react'

// Mock data for charts
const revenueData = [
  { month: "Jan", revenue: 5000 },
  { month: "Feb", revenue: 7000 },
  { month: "Mar", revenue: 6500 },
  { month: "Apr", revenue: 8000 },
  { month: "May", revenue: 9500 },
  { month: "Jun", revenue: 11000 },
]

const orderData = [
  { name: "Completed", value: 540 },
  { name: "Pending", value: 120 },
  { name: "Cancelled", value: 30 },
]

const customerData = [
  { month: "Jan", newCustomers: 50, returningCustomers: 200 },
  { month: "Feb", newCustomers: 80, returningCustomers: 220 },
  { month: "Mar", newCustomers: 70, returningCustomers: 240 },
  { month: "Apr", newCustomers: 90, returningCustomers: 280 },
  { month: "May", newCustomers: 110, returningCustomers: 300 },
  { month: "Jun", newCustomers: 130, returningCustomers: 340 },
]

const productData = [
  { name: "Product A", sales: 4000 },
  { name: "Product B", sales: 3000 },
  { name: "Product C", sales: 2000 },
  { name: "Product D", sales: 2780 },
  { name: "Product E", sales: 1890 },
]

export default function ResponsiveAnalytics() {
  const [timeRange, setTimeRange] = useState('6M')
  const [isLoading, setIsLoading] = useState(true)
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 ">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8 ">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-[#F5F5DC] border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
        >
          <option value="1M">Last Month</option>
          <option value="3M">Last 3 Months</option>
          <option value="6M">Last 6 Months</option>
          <option value="1Y">Last Year</option>
        </select>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  [&>*]:bg-[#F5F5DC] ">
        <StatCard
          title="Total Revenue"
          value="$47,000"
          change={12.5}
          icon={<DollarSign className="h-6 w-6" />}
          
          
        />
        <StatCard
          title="Total Orders"
          value="690"
          change={8.2}
          icon={<ShoppingCart className="h-6 w-6 " />}
        />
        <StatCard
          title="New Customers"
          value="130"
          change={-3.1}
          icon={<Users className="h-6 w-6" />}
        />
        <StatCard
          title="Average Order Value"
          value="$68.12"
          change={5.7}
          icon={<ArrowUpRight className="h-6 w-6" />}
        />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className='bg-[#F5F5DC]'>
           <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] ">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-[#F5F5DC]'>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#10B981"
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className='bg-[#F5F5DC]'>
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={customerData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="newCustomers" fill="#10B981" stackId="a" />
                  <Bar dataKey="returningCustomers" fill="#3B82F6" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-[#F5F5DC]'>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productData} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ title, value, change, icon }) {
  const isPositive = change >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className='bg-[#F5F5DC]'>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'} flex items-center`}>
            {isPositive ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
            {Math.abs(change)}% from last month
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}