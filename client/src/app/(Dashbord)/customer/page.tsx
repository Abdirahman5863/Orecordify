/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from 'react';
import { Search, Download, Upload, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomerTable from '@/components/customers/customerTable';
import CustomerFilters from '@/components/customers/customerFilters';
import AddCustomerDialog from '@/components/customers/AddCustomerDialog';
import { useToast } from "@/hooks/use-toast";
import { Customer } from '@/types/customer';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    status: 'all',
    type: 'all',
    category: 'all',
    priority: 'all',
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCustomers();
  }, []);
  
  const saveUser = async () => { const response = await fetch('/api/auth/new-user', { method: 'GET', });  
  if (response.ok) { const user = await response.json(); 
    console.log('User saved:', user); } 
    else { console.error('Failed to save user'); } 
  }; useEffect(() => { saveUser(); }, []);;
  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customer');
      if (!response.ok) throw new Error('Failed to fetch customers');
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch customers",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    const csvContent = customers.map(customer => {
      return [
        customer.customerId,
        customer.name,
        
        customer.phone,
        customer.type,
        customer.category,
        customer.status,
        customer.priority || '',
        customer.tags.join(';'),
      ].join(',');
    });
    
    const pdf = ['ID,Name,Phone,Type,Category,Status,Priority,Tags', ...csvContent].join('\pdf');
    const blob = new Blob([pdf], { type: 'text/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customers.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     
      customer.phone.includes(searchTerm) ||
      customer.customerId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters = 
      (selectedFilters.status === 'all' || customer.status === selectedFilters.status) &&
      (selectedFilters.type === 'all' || customer.type === selectedFilters.type) &&
      (selectedFilters.category === 'all' || customer.category === selectedFilters.category) &&
      (selectedFilters.priority === 'all' || customer.priority === selectedFilters.priority);

    return matchesSearch && matchesFilters;
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <h1 className="text-3xl font-bold">Customers</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
         
            <AddCustomerDialog onCustomerAdded={fetchCustomers} />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[250px,1fr]">
          <CustomerFilters
            selectedFilters={selectedFilters}
            onFilterChange={setSelectedFilters}
          />

          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search customers..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <CustomerTable
              customers={filteredCustomers}
              onCustomerUpdated={fetchCustomers}
              onCustomerDeleted={fetchCustomers}
            />
          </div>
        </div>
      </div>
    </div>
  );
}