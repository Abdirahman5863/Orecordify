/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck


"use client"

import { useState } from 'react'
import { Search, Plus, ChevronDown, ChevronUp } from 'lucide-react'

import Addcustomer from '@/components/AddCustomer'

const customers = [
  { id: '001', name: 'Alice Johnson', email: 'alice@example.com', orders: 5, totalSpent: 750.00 },
  { id: '002', name: 'Bob Smith', email: 'bob@example.com', orders: 3, totalSpent: 450.50 },
  { id: '003', name: 'Charlie Brown', email: 'charlie@example.com', orders: 7, totalSpent: 1200.00 },
  { id: '004', name: 'David Lee', email: 'david@example.com', orders: 2, totalSpent: 300.00 },
  { id: '005', name: 'Emma Davis', email: 'emma@example.com', orders: 4, totalSpent: 600.00 },
]

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState('id')
  const [sortDirection, setSortDirection] = useState('asc')

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
      <div className="flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2">
          <Plus className="h-5 w-5" />
      <Addcustomer/>
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['id', 'name', 'email', 'orders', 'totalSpent'].map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column === 'totalSpent' ? 'Total Spent' : column.charAt(0).toUpperCase() + column.slice(1)}</span>
                    {sortColumn === column && (
                      sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedCustomers.map((customer) => (
              <tr
                className="hover:bg-gray-50"
                key={customer.id}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.orders}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${customer.totalSpent.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}