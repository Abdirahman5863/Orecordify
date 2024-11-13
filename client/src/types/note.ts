export interface Note {
    id: string;
    title: string;
    content: string;
    type: string;
    priority?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    customer?: {
      name: string;
    };
    order?: {
      orderNumber: string;
    };
    inventory?: {
      name: string;
    };
  }