import { CategorySalesBarChart } from "@/components/charts/category-sales-bar-chart";
import { VisitorLineChart } from "@/components/charts/visitor-line-chart";
import { PageTitle } from "@/components/layout/page-title";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DateRangeSelect } from "@/features/analytics/date-range-select";
import { getAnalyticsData } from "@/features/analytics/data";
import type {
  AnalyticsRange,
} from "@/features/analytics/types";

type AnalyticsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const validRanges = new Set<AnalyticsRange>(["7d", "30d", "90d"]);

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default async function AnalyticsPage({
  searchParams,
}: AnalyticsPageProps) {
  const params = await searchParams;
  const rawRange = Array.isArray(params.range) ? params.range[0] : params.range;
  const range =
    rawRange && validRanges.has(rawRange as AnalyticsRange)
      ? (rawRange as AnalyticsRange)
      : "30d";
  const analytics = getAnalyticsData(range);

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-1">
          <PageTitle />
          <p className="text-sm text-muted-foreground">
            Dive deeper into the metrics that move your business forward.
          </p>
        </div>
        <DateRangeSelect value={range} />
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Visitors</CardTitle>
            <CardDescription>
              Daily visitors over the last {range.slice(0, -1)} days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <VisitorLineChart data={analytics.visitors} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales by category</CardTitle>
            <CardDescription>
              Revenue breakdown across product categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CategorySalesBarChart data={analytics.salesByCategory} />
          </CardContent>
        </Card>
      </section>

      <Card className="p-0">
        <CardHeader className="p-5 sm:p-6">
          <CardTitle>Top products</CardTitle>
          <CardDescription>
            Best-performing products in the selected period
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table className="min-w-[620px]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Units sold</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analytics.topProducts.map((product) => (
                <TableRow key={product.name}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {product.category}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {product.unitsSold.toLocaleString("en-US")}
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums">
                    {currencyFormatter.format(product.revenue)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
