"use client";

import { format } from 'date-fns';
import { ChevronDown, Edit, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Customer } from '@/types/customer';
import { useToast } from "@/hooks/use-toast";

import { useState } from 'react';
import EditCustomerDialog from './EditcustomerDialog';

interface CustomerTableProps {
  customers: Customer[];
  onCustomerUpdated: () => void;
  onCustomerDeleted: () => void;
}

export default function CustomerTable({ customers, onCustomerUpdated, onCustomerDeleted ,}: CustomerTableProps) {
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const { toast } = useToast();

  const handleDeleteCustomer = async (id: string) => {
    try {
      const response = await fetch(`/api/customer?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete customer');
      
      toast({
        title: "Success",
        description: "Customer deleted successfully",
      });
      
      onCustomerDeleted();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete customer",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
    };
    return styles[status as keyof typeof styles] || styles.active;
  };

  const getTypeBadge = (type: string) => {
    const styles = {
      vip: "bg-purple-100 text-purple-800",
      business: "bg-blue-100 text-blue-800",
      regular: "bg-gray-100 text-gray-800",
    };
    return styles[type as keyof typeof styles] || styles.regular;
  };

  const getPriorityBadge = (priority: string | null) => {
    const styles = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800",
    };
    return priority ? styles[priority as keyof typeof styles] : "";
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Last Interaction</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.customerId}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                   
                    <span className="text-sm text-gray-500">{customer.phone}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getTypeBadge(customer.type)}>
                    {customer.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadge(customer.status)}>
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {customer.priority && (
                    <Badge className={getPriorityBadge(customer.priority)}>
                      {customer.priority}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {customer.lastInteraction 
                    ? format(new Date(customer.lastInteraction), 'MMM d, yyyy')
                    : 'Never'
                  }
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setEditingCustomer(customer)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Customer
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteCustomer(customer.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Customer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingCustomer && (
        <EditCustomerDialog
          customer={editingCustomer}
                
          
          
          onCustomerUpdated={() => {
            onCustomerUpdated();
            setEditingCustomer(null);
          }}
        />
      )}
    </>
  )}
  
  