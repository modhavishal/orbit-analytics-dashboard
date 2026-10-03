export type CustomerPlan = "free" | "pro" | "team";

export type CustomerStatus = "active" | "inactive";

export type Customer = {
  id: string;
  name: string;
  email: string;
  plan: CustomerPlan;
  status: CustomerStatus;
  country: string;
  joinedAt: string;
  totalSpent: number;
};

export type CustomerSortField =
  | "name"
  | "email"
  | "plan"
  | "status"
  | "country"
  | "joinedAt"
  | "totalSpent";

export type SortOrder = "asc" | "desc";

export type CustomerQuery = {
  q?: string;
  plan?: CustomerPlan;
  status?: CustomerStatus;
  sort: CustomerSortField;
  order: SortOrder;
  page: number;
  pageSize: number;
};

export type CustomerOrder = {
  id: string;
  customerId: string;
  description: string;
  amount: number;
  status: "paid" | "pending" | "refunded";
  date: string;
};

export type CustomerListResult = {
  customers: Customer[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
