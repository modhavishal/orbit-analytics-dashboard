import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Percent,
  ShoppingCart,
  UsersRound,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { RevenueAreaChart } from "@/components/charts/revenue-area-chart";
import { TrafficSourcesDonutChart } from "@/components/charts/traffic-sources-donut-chart";
import { getOverviewData } from "@/lib/mock-data";
import type { OrderStatus } from "@/features/overview/types";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const orderStatusStyles: Record<OrderStatus, string> = {
  paid:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  pending: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  refunded: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

export default async function OverviewPage() {
  const overview = await getOverviewData();
  const metrics = [
    {
      label: "Revenue",
      value: currencyFormatter.format(overview.summary.revenue),
      trend: overview.summary.trends.revenue,
      icon: Wallet,
    },
    {
      label: "Customers",
      value: overview.summary.customers.toLocaleString("en-US"),
      trend: overview.summary.trends.customers,
      icon: UsersRound,
    },
    {
      label: "Orders",
      value: overview.summary.orders.toLocaleString("en-US"),
      trend: overview.summary.trends.orders,
      icon: ShoppingCart,
    },
    {
      label: "Conversion rate",
      value: `${overview.summary.conversionRate.toFixed(1)}%`,
      trend: overview.summary.trends.conversionRate,
      icon: Percent,
    },
  ];

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening with your store today.
          </p>
          <h2 className="mt-1.5 text-2xl font-semibold tracking-[-0.04em] sm:text-[28px]">
            Good morning, Jamie <span aria-hidden="true">👋</span>
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">Last 12 months</p>
      </section>

      <section
        aria-label="Key metrics"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {metrics.map(
          ({ label, value, trend, icon: Icon }) => {
            const isRising = trend >= 0;
            const TrendIcon = isRising ? ArrowUpRight : ArrowDownRight;

            return (
              <article
                key={label}
                className="rounded-xl border border-border/80 bg-card p-5 shadow-sm shadow-slate-950/[0.025] transition-shadow hover:shadow-md dark:shadow-black/10"
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium text-muted-foreground">
                    {label}
                  </p>
                  <span className="flex size-9 items-center justify-center rounded-xl bg-primary/8 text-primary">
                    <Icon
                      aria-hidden="true"
                      className="size-[17px]"
                      strokeWidth={1.8}
                    />
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-baseline gap-2.5">
                  <p className="text-[27px] font-semibold tracking-[-0.04em]">
                    {value}
                  </p>
                  <span
                    className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                      isRising
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    <TrendIcon aria-hidden="true" className="size-3.5" />
                    {Math.abs(trend).toFixed(1)}%
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  vs. previous month
                </p>
              </article>
            );
          },
        )}
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.7fr)_minmax(260px,0.9fr)]">
        <article className="rounded-xl border border-border/80 bg-card p-5 shadow-sm shadow-slate-950/[0.025] sm:p-6">
          <div>
            <h3 className="text-sm font-semibold">Revenue over time</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Monthly revenue for the last 12 months
            </p>
          </div>
          <div className="mt-6">
            <RevenueAreaChart data={overview.revenueByMonth} />
          </div>
        </article>

        <article className="rounded-xl border border-border/80 bg-card p-5 shadow-sm shadow-slate-950/[0.025] sm:p-6">
          <div>
            <h3 className="text-sm font-semibold">Traffic sources</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Where your visitors come from
            </p>
          </div>
          <div className="mt-3">
            <TrafficSourcesDonutChart
              data={overview.trafficSources}
              totalOrders={overview.summary.orders}
            />
          </div>
        </article>
      </section>

      <section className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm shadow-slate-950/[0.025]">
        <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-6">
          <div>
            <h3 className="text-sm font-semibold">Recent orders</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              The latest orders from your store
            </p>
          </div>
          <Link
            href="/orders"
            className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
          >
            View all <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-xs">
            <caption className="sr-only">Recent orders</caption>
            <thead className="border-y border-border/70 bg-muted/40 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">
                  Customer
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Order
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Date
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {overview.orders.map((order) => (
                <tr
                  key={order.id}
                  className="transition-colors hover:bg-muted/30"
                >
                  <td className="px-6 py-3.5">
                    <span className="block font-medium">
                      {order.customer.name}
                    </span>
                    <span className="mt-0.5 block text-[10px] text-muted-foreground">
                      {order.customer.email}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-medium text-muted-foreground">
                    #{order.id}
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground">
                    {dateFormatter.format(new Date(`${order.date}T12:00:00`))}
                  </td>
                  <td className="px-4 py-3.5 font-medium">
                    {currencyFormatter.format(order.amount)}
                  </td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-medium capitalize ${orderStatusStyles[order.status]}`}
                    >
                      <span className="size-1.5 rounded-full bg-current" />
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
