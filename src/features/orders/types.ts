export type OrderStatus = "paid" | "pending" | "refunded";

export type OrderItem = {
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
};

export type Order = {
  id: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  amount: number;
  status: OrderStatus;
  date: string;
  items: OrderItem[];
};

export type OrderStatusFilter = "all" | OrderStatus;
