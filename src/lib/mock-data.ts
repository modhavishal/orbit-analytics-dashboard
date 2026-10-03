import type { Customer, CustomerOrder } from "@/features/customers/types";
import type { OverviewData } from "@/features/overview/types";

export const overviewData: OverviewData = {
  summary: {
    revenue: 566650,
    customers: 3650,
    orders: 8742,
    conversionRate: 3.8,
    trends: {
      revenue: 12.8,
      customers: 8.2,
      orders: -2.4,
      conversionRate: 0.6,
    },
  },
  revenueByMonth: [
    { month: "Nov '25", revenue: 38200 },
    { month: "Dec '25", revenue: 45100 },
    { month: "Jan '26", revenue: 39750 },
    { month: "Feb '26", revenue: 42400 },
    { month: "Mar '26", revenue: 46800 },
    { month: "Apr '26", revenue: 44300 },
    { month: "May '26", revenue: 49100 },
    { month: "Jun '26", revenue: 47300 },
    { month: "Jul '26", revenue: 51800 },
    { month: "Aug '26", revenue: 53600 },
    { month: "Sep '26", revenue: 50100 },
    { month: "Oct '26", revenue: 58200 },
  ],
  customers: [
    { id: "cus-1001", name: "Alex Morgan", email: "alex.morgan@example.com" },
    { id: "cus-1002", name: "Jordan Lee", email: "jordan.lee@example.com" },
    { id: "cus-1003", name: "Sam Kim", email: "sam.kim@example.com" },
    { id: "cus-1004", name: "Riley Taylor", email: "riley.taylor@example.com" },
    { id: "cus-1005", name: "Casey Patel", email: "casey.patel@example.com" },
    { id: "cus-1006", name: "Taylor Brooks", email: "taylor.brooks@example.com" },
    { id: "cus-1007", name: "Morgan Chen", email: "morgan.chen@example.com" },
    { id: "cus-1008", name: "Jamie Rivera", email: "jamie.rivera@example.com" },
  ],
  orders: [
    {
      id: "ORD-3842",
      customer: {
        id: "cus-1001",
        name: "Alex Morgan",
        email: "alex.morgan@example.com",
      },
      amount: 284,
      status: "paid",
      date: "2026-10-03",
    },
    {
      id: "ORD-3841",
      customer: {
        id: "cus-1002",
        name: "Jordan Lee",
        email: "jordan.lee@example.com",
      },
      amount: 128.5,
      status: "pending",
      date: "2026-10-02",
    },
    {
      id: "ORD-3840",
      customer: {
        id: "cus-1003",
        name: "Sam Kim",
        email: "sam.kim@example.com",
      },
      amount: 520,
      status: "paid",
      date: "2026-10-02",
    },
    {
      id: "ORD-3839",
      customer: {
        id: "cus-1004",
        name: "Riley Taylor",
        email: "riley.taylor@example.com",
      },
      amount: 76.25,
      status: "refunded",
      date: "2026-10-01",
    },
    {
      id: "ORD-3838",
      customer: {
        id: "cus-1005",
        name: "Casey Patel",
        email: "casey.patel@example.com",
      },
      amount: 342.8,
      status: "paid",
      date: "2026-09-30",
    },
  ],
  trafficSources: [
    { name: "Direct", sessions: 8400, percentage: 42 },
    { name: "Social media", sessions: 5200, percentage: 26 },
    { name: "Organic search", sessions: 3600, percentage: 18 },
    { name: "Referral", sessions: 2800, percentage: 14 },
  ],
};

const firstNames = [
  "Alex",
  "Jordan",
  "Sam",
  "Riley",
  "Casey",
  "Taylor",
  "Morgan",
  "Jamie",
  "Avery",
  "Cameron",
];

const lastNames = ["Morgan", "Lee", "Kim", "Taylor", "Patel", "Brooks"];

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "India",
  "Japan",
  "Brazil",
  "Netherlands",
];

const plans = ["free", "pro", "team"] as const;
const orderStatuses = ["paid", "paid", "pending", "refunded"] as const;
const orderDescriptions = [
  "Workspace subscription",
  "Annual plan renewal",
  "Additional team seats",
];

export const customers: Customer[] = Array.from({ length: 60 }, (_, index) => {
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[Math.floor(index / firstNames.length)];
  const joinedAt = new Date(
    Date.UTC(2023 + Math.floor(index / 30), (index * 5) % 12, (index * 7) % 28 + 1),
  )
    .toISOString()
    .slice(0, 10);

  return {
    id: `cus-${1001 + index}`,
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index + 1}@example.com`,
    plan: plans[index % plans.length],
    status: index % 7 === 0 ? "inactive" : "active",
    country: countries[index % countries.length],
    joinedAt,
    totalSpent: Number((625 + ((index * 347) % 12400) + (index % 4) * 0.5).toFixed(2)),
  };
});

export const customerOrders: CustomerOrder[] = customers.flatMap(
  (customer, customerIndex) =>
    Array.from({ length: 3 }, (_, orderIndex) => {
      const date = new Date(Date.UTC(2026, 9, 3 - customerIndex - orderIndex * 4))
        .toISOString()
        .slice(0, 10);

      return {
        id: `ORD-${5000 + customerIndex * 3 + orderIndex}`,
        customerId: customer.id,
        description: orderDescriptions[(customerIndex + orderIndex) % orderDescriptions.length],
        amount: Number((19 + ((customerIndex * 37 + orderIndex * 53) % 140) + 0.99).toFixed(2)),
        status: orderStatuses[(customerIndex + orderIndex) % orderStatuses.length],
        date,
      };
    }),
);

export async function getOverviewData(): Promise<OverviewData> {
  return overviewData;
}
