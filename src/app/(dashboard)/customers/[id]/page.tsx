import {
  CalendarDays,
  CreditCard,
  Mail,
  MapPin,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CustomerStatusBadge,
  PlanBadge,
} from "@/features/customers/customer-badges";
import {
  getCustomerById,
  getRecentCustomerOrders,
} from "@/features/customers/data";
import type { CustomerOrder } from "@/features/customers/types";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const orderStatusStyles: Record<CustomerOrder["status"], string> = {
  paid: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  pending: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  refunded: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
};

function formatDate(value: string): string {
  const [year, month, day] = value.split("-").map(Number);
  return dateFormatter.format(new Date(year, month - 1, day));
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default async function CustomerDetailPage({
  params,
}: PageProps<"/customers/[id]">) {
  const { id } = await params;
  const customer = getCustomerById(id);

  if (!customer) {
    notFound();
  }

  const orders = getRecentCustomerOrders(customer.id);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/customers"
          className={`${buttonVariants({ variant: "ghost" })} -ml-2 mb-3 text-muted-foreground`}
        >
          <span aria-hidden="true">←</span>
          Back to customers
        </Link>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
              {getInitials(customer.name)}
            </span>
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.04em]">
                {customer.name}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{customer.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 pl-[4.5rem] sm:pl-0">
            <PlanBadge plan={customer.plan} />
            <CustomerStatusBadge status={customer.status} />
          </div>
        </div>
      </div>

      <section
        aria-label="Customer statistics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        <Card size="sm">
          <CardContent className="flex items-center gap-3 pt-(--card-spacing)">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CreditCard aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Total spent</p>
              <p className="mt-0.5 text-xl font-semibold tabular-nums">
                {currencyFormatter.format(customer.totalSpent)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardContent className="flex items-center gap-3 pt-(--card-spacing)">
            <span className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-300">
              <ShoppingBag aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Total orders</p>
              <p className="mt-0.5 text-xl font-semibold tabular-nums">
                {orders.length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardContent className="flex items-center gap-3 pt-(--card-spacing)">
            <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
              <CalendarDays aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Customer since</p>
              <p className="mt-0.5 text-xl font-semibold">
                {formatDate(customer.joinedAt)}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 lg:grid-cols-[minmax(240px,0.8fr)_minmax(0,1.5fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Customer account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-start gap-3">
              <Mail aria-hidden="true" className="mt-0.5 size-4 text-muted-foreground" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Email address</p>
                <p className="mt-1 break-all font-medium">{customer.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Country</p>
                <p className="mt-1 font-medium">{customer.country}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <UserRound aria-hidden="true" className="mt-0.5 size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Customer ID</p>
                <p className="mt-1 font-medium">{customer.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent orders</CardTitle>
            <CardDescription>
              The latest purchases from {customer.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {orders.length > 0 ? (
              <div className="divide-y divide-border/70">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="font-medium">{order.description}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {order.id} · {formatDate(order.date)}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">
                      <Badge
                        className={`capitalize ${orderStatusStyles[order.status]}`}
                        variant="secondary"
                      >
                        {order.status}
                      </Badge>
                      <span className="min-w-20 text-right font-medium tabular-nums">
                        {currencyFormatter.format(order.amount)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No orders yet.
              </p>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
