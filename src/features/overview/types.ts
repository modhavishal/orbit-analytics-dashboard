export type RevenueMonth = {
  month: string;
  revenue: number;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
};

export type OrderStatus = "paid" | "pending" | "refunded";

export type Order = {
  id: string;
  customer: Customer;
  amount: number;
  status: OrderStatus;
  date: string;
};

export type TrafficSource = {
  name: string;
  sessions: number;
  percentage: number;
};

export type OverviewData = {
  summary: {
    revenue: number;
    customers: number;
    orders: number;
    conversionRate: number;
    trends: {
      revenue: number;
      customers: number;
      orders: number;
      conversionRate: number;
    };
  };
  revenueByMonth: RevenueMonth[];
  customers: Customer[];
  orders: Order[];
  trafficSources: TrafficSource[];
};
