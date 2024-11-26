/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface InventoryItem {
  id: string;
  name: string;
  price: number;
}

interface OrderItem {
  itemId: string;
  itemName: string;
  quantity: number;
  price: number;
}

interface AddOrderDialogProps {
  onOrderAdded: () => void;
  totalOrders: number;
}

export default function AddOrderDialog({
  onOrderAdded,
  totalOrders,
}: AddOrderDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    customerId: "",
    customerName: "",
    status: "pending" as const,
    items: [{ itemId: "", itemName: "", quantity: 1, price: 0 }] as OrderItem[],
  });

  const nextOrderNumber = `OD${String(totalOrders + 1).padStart(4, "0")}`;

  useEffect(() => {
    fetchCustomers();
    fetchInventoryItems();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/customer");
      if (!response.ok) throw new Error("Failed to fetch customers");
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch customers",
        variant: "destructive",
      });
    }
  };

  const fetchInventoryItems = async () => {
    try {
      const response = await fetch("/api/inventory");
      if (!response.ok) throw new Error("Failed to fetch inventory items");
      const data = await response.json();
      setInventoryItems(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch inventory items",
        variant: "destructive",
      });
    }
  };

  const calculateTotalAmount = () => {
    return formData.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerId) {
      toast({
        title: "Error",
        description: "Please select a customer",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const validItems = formData.items.every(
        (item) =>
          item.itemId &&
          item.itemName &&
          item.quantity > 0 &&
          item.price >= 0
      );

      if (!validItems) {
        throw new Error("Please fill in all item details correctly");
      }

      const totalAmount = calculateTotalAmount();

      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, totalAmount }),
      });

      if (!response.ok) throw new Error("Failed to create order");

      toast({
        title: "Success",
        description: `Order ${nextOrderNumber} created successfully`,
      });

      setFormData({
        customerId: "",
        customerName: "",
        status: "pending",
        items: [{ itemId: "", itemName: "", quantity: 1, price: 0 }],
      });

      setIsOpen(false);
      onOrderAdded();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create order",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemChange = (index: number, field: keyof OrderItem, value: string | number) => {
    const newItems = [...formData.items];
    if (field === "itemId") {
      const selectedItem = inventoryItems.find((item) => item.id === value);
      if (selectedItem) {
        newItems[index] = {
          ...newItems[index],
          itemId: selectedItem.id,
          itemName: selectedItem.name,
          price: selectedItem.price,
        };
      }
    } else {
      newItems[index] = {
        ...newItems[index],
        [field]: field === "quantity" || field === "price"
          ? parseFloat(value as string) || 0
          : value,
      };
    }
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const handleCustomerChange = (customerId: string) => {
    const customer = customers.find((c) => c.id === customerId);
    if (customer) {
      setFormData((prev) => ({
        ...prev,
        customerId: customer.id,
        customerName: customer.name,
      }));
    }
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { itemId: "", itemName: "", quantity: 1, price: 0 }],
    }));
  };

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, items: newItems }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Order ({nextOrderNumber})</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="customerId">Customer</Label>
            <Select
              value={formData.customerId || undefined}
              onValueChange={handleCustomerChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Order Items</Label>
            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-gray-50 p-4 rounded-lg">
                <div>
                  <Label htmlFor={`itemId-${index}`}>Item</Label>
                  <Select
                    value={item.itemId || undefined}
                    onValueChange={(value) => handleItemChange(index, "itemId", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select item" />
                    </SelectTrigger>
                    <SelectContent>
                      {inventoryItems.map((inventoryItem) => (
                        <SelectItem key={inventoryItem.id} value={inventoryItem.id}>
                        
                          {inventoryItem.name} - ${inventoryItem.price.toFixed(2)}
                        
                        </SelectItem>
                          
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                  <Input
                    id={`quantity-${index}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor={`price-${index}`}>Price</Label>
                    <Input
                      id={`price-${index}`}
                      type="number"
                      value={item.price}
                      disabled
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="mt-auto"
                    onClick={() => removeItem(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button type="button" onClick={addItem} variant="outline">
              <Plus className="h-4 w-4" /> Add Item
            </Button>
          </div>

          <Button disabled={isLoading} className="w-full">
            {isLoading ? "Saving..." : "Save Order"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
