import type {
  AnalyticsData,
  AnalyticsRange,
  VisitorPoint,
} from "@/features/analytics/types";

const rangeLengths: Record<AnalyticsRange, number> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

const salesByCategory: AnalyticsData["salesByCategory"] = [
  { category: "Subscriptions", sales: 42850 },
  { category: "Team seats", sales: 18640 },
  { category: "Support", sales: 12480 },
  { category: "Add-ons", sales: 9720 },
  { category: "Other", sales: 5340 },
];

const topProducts: AnalyticsData["topProducts"] = [
  { name: "Orbit Pro monthly", category: "Subscriptions", unitsSold: 1284, revenue: 38520 },
  { name: "Orbit Team monthly", category: "Subscriptions", unitsSold: 462, revenue: 23100 },
  { name: "Additional team seats", category: "Team seats", unitsSold: 716, revenue: 18616 },
  { name: "Priority support", category: "Support", unitsSold: 284, revenue: 14200 },
  { name: "Custom workspace theme", category: "Add-ons", unitsSold: 193, revenue: 5790 },
];

function makeVisitorSeries(days: number): VisitorPoint[] {
  const lastDay = new Date(Date.UTC(2026, 9, 3));

  return Array.from({ length: days }, (_, index) => {
    const date = new Date(lastDay);
    date.setUTCDate(lastDay.getUTCDate() - (days - index - 1));
    const weekday = date.getUTCDay();
    const weeklyAdjustment = weekday === 0 || weekday === 6 ? -260 : 180;
    const trend = Math.round(index * 3.2);
    const variation = (index * 137) % 390;

    return {
      date: date.toISOString().slice(0, 10),
      visitors: 1780 + weeklyAdjustment + trend + variation,
    };
  });
}

export function getAnalyticsData(range: AnalyticsRange): AnalyticsData {
  const rangeRatio = rangeLengths[range] / rangeLengths["30d"];

  return {
    visitors: makeVisitorSeries(rangeLengths[range]),
    salesByCategory: salesByCategory.map((category) => ({
      ...category,
      sales: Math.round(category.sales * rangeRatio),
    })),
    topProducts: topProducts.map((product) => ({
      ...product,
      unitsSold: Math.round(product.unitsSold * rangeRatio),
      revenue: Math.round(product.revenue * rangeRatio),
    })),
  };
}
