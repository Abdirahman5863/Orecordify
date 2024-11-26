/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface AddInventoryDialogProps {
  onItemAdded: () => void;
}

export default function AddInventoryDialog({ onItemAdded }: AddInventoryDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    category: '',
    quantity: 0,
    price: 0,
    reorderPoint: 10,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to create item');

      toast({
        title: "Success",
        description: "Inventory item created successfully",
      });

      setFormData({
        name: '',
        sku: '',
        description: '',
        category: '',
        quantity: 0,
        price: 0,
        reorderPoint: 10,
      });

      setIsOpen(false);
      onItemAdded();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create inventory item",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' || name === 'reorderPoint'
        ? parseFloat(value)
        : value
    }));
  };

  const categories = [
    "Electronics",
    "Clothing",
    "Food",
    "Books",
    "Toys",
    "Home & Garden",
    "Sports",
    "Other"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Inventory Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              value={formData.sku}
              disabled
              className="bg-gray-100"
            />
            </div>
         
          <div className="grid w-full gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="reorderPoint">Reorder Point</Label>
            <Input
              id="reorderPoint"
              name="reorderPoint"
              type="number"
              min="0"
              value={formData.reorderPoint}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Creating..." : "Create Item"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}