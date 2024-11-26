/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, ArrowUpRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface AnalyticsData {
  summary: {
    totalRevenue: { value: number; change: number; };
    totalOrders: { value: number; change: number; };
    newCustomers: { value: number; change: number; };
    averageOrderValue: { value: number; change: number; };
  };
  orderStatus: {
    completed: number;
    pending: number;
    canceled: number;
  };
  topProducts: Array<{ name: string; sales: number; }>;
  revenueData: Array<{ timestamp: string; revenue: number; }>;
  customerData: Array<{ timestamp: string; newCustomers: number; }>;
}

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('1D');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchAnalytics();
    // Set up polling for real-time updates
    const interval = setInterval(fetchAnalytics, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/analytics?range=${timeRange}`);
      if (!response.ok) throw new Error('Failed to fetch analytics');
      const analyticsData = await response.json();
      setData(analyticsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch analytics data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    switch (timeRange) {
      case '1D':
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case '7D':
        return date.toLocaleDateString([], { weekday: 'short' });
      case '1M':
        return date.toLocaleDateString([], { day: '2-digit', month: 'short' });
      case '1Y':
        return date.toLocaleDateString([], { month: 'short' });
      default:
        return date.toLocaleDateString();
    }
  };

  if (isLoading || !data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  const orderStatusData = [
    { name: "Completed", value: data.orderStatus.completed },
    { name: "Pending", value: data.orderStatus.pending },
    { name: "Cancelled", value: data.orderStatus.canceled },
  ];

  const formattedRevenueData = data.revenueData.map(item => ({
    time: formatTimestamp(item.timestamp),
    revenue: item.revenue,
  }));

  const formattedCustomerData = data.customerData.map(item => ({
    time: formatTimestamp(item.timestamp),
    newCustomers: item.newCustomers,
  }));

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        >
          <option value="1D">Last 24 hours</option>
          <option value="7D">Last 7 days</option>
          <option value="1M">Last month</option>
          <option value="1Y">Last year</option>
        </select>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`$${data.summary.totalRevenue.value.toFixed(2)}`}
          change={data.summary.totalRevenue.change}
          icon={<DollarSign className="h-6 w-6" />}
        />
        <StatCard
          title="Total Orders"
          value={data.summary.totalOrders.value.toString()}
          change={data.summary.totalOrders.change}
          icon={<ShoppingCart className="h-6 w-6" />}
        />
        <StatCard
          title="New Customers"
          value={data.summary.newCustomers.value.toString()}
          change={data.summary.newCustomers.change}
          icon={<Users className="h-6 w-6" />}
        />
        <StatCard
          title="Average Order Value"
          value={`$${data.summary.averageOrderValue.value.toFixed(2)}`}
          change={data.summary.averageOrderValue.change}
          icon={<ArrowUpRight className="h-6 w-6" />}
        />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formattedRevenueData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={timeRange === '1D'}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
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
        <Card>
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={formattedCustomerData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="newCustomers" fill="#10B981" name="New Customers" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.topProducts} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#10B981" name="Sales" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon }: { 
  title: string; 
  value: string; 
  change: number; 
  icon: React.ReactNode; 
}) {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'} flex items-center`}>
            {isPositive ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
            {Math.abs(change).toFixed(1)}% from last period
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}