export interface Customer {
    id: string;
    customerId: string;
    name: string;
  
    phone: string;
    status: string;
    type: string;
    category: string;
    priority: string | null;
    tags: string[];
    lastInteraction: string | null;
    totalOrders: number;
    totalSpent: number;
    createdAt: string;
    updatedAt: string;
    notes?: Array<{
      title: string;
      content: string;
      createdAt: string;
    }>;
    orders?: Array<{
      orderNumber: string;
      totalAmount: number;
      createdAt: string;
    }>;
  }