export type AnalyticsRange = "7d" | "30d" | "90d";

export type VisitorPoint = {
  date: string;
  visitors: number;
};

export type CategorySales = {
  category: string;
  sales: number;
};

export type TopProduct = {
  name: string;
  category: string;
  unitsSold: number;
  revenue: number;
};

export type AnalyticsData = {
  visitors: VisitorPoint[];
  salesByCategory: CategorySales[];
  topProducts: TopProduct[];
};
