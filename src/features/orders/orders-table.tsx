"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { SearchField } from "@/components/ui/search-field";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderStatusBadge } from "@/features/orders/order-status-badge";
import type {
  Order,
  OrderStatusFilter,
} from "@/features/orders/types";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatDate(value: string): string {
  const [year, month, day] = value.split("-").map(Number);
  return dateFormatter.format(new Date(year, month - 1, day));
}

type OrdersTableProps = {
  orders: Order[];
  search: string;
  status: OrderStatusFilter;
  counts: Record<OrderStatusFilter, number>;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export function OrdersTable({
  orders,
  search,
  status,
  counts,
  page,
  pageSize,
  total,
  totalPages,
}: OrdersTableProps) {
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchInput, setSearchInput] = useState(search);
  const statuses: { label: string; value: OrderStatusFilter }[] = [
    { label: "All", value: "all" },
    { label: "Paid", value: "paid" },
    { label: "Pending", value: "pending" },
    { label: "Refunded", value: "refunded" },
  ];
  const rowStart = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const rowEnd = Math.min(page * pageSize, total);
  const firstVisiblePage = Math.max(1, Math.min(page - 2, totalPages - 4));
  const visiblePages = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, index) => firstVisiblePage + index,
  );

  useEffect(() => {
    const query = searchInput.trim();
    if (query === search) {
      return;
    }

    const timeout = window.setTimeout(() => {
      const params = new URLSearchParams();
      if (status !== "all") {
        params.set("status", status);
      }
      if (query) {
        params.set("q", query);
      }

      const queryString = params.toString();
      router.replace(queryString ? `/orders?${queryString}` : "/orders", {
        scroll: false,
      });
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [router, search, searchInput, status]);

  function getPageHref(targetPage: number) {
    const params = new URLSearchParams();
    if (status !== "all") {
      params.set("status", status);
    }
    if (search) {
      params.set("q", search);
    }
    if (targetPage > 1) {
      params.set("page", String(targetPage));
    }
    return `/orders${params.size ? `?${params.toString()}` : ""}`;
  }

  return (
    <>
      <section className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm shadow-foreground/[0.03]">
        <div className="flex flex-col gap-3 border-b border-border/70 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:p-5">
          <nav
            aria-label="Filter orders by status"
            className="flex w-fit max-w-full flex-wrap gap-1 rounded-xl bg-muted/60 p-1"
          >
            {statuses.map((tab) => {
              const params = new URLSearchParams();
              if (tab.value !== "all") {
                params.set("status", tab.value);
              }
              if (search) {
                params.set("q", search);
              }
              const href = `/orders${params.size ? `?${params.toString()}` : ""}`;

              return (
                <Link
                  key={tab.value}
                  href={href}
                  aria-current={status === tab.value ? "page" : undefined}
                  className={`inline-flex h-9 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring ${
                    status === tab.value
                      ? "bg-background text-foreground shadow-sm ring-1 ring-border/70"
                      : "text-muted-foreground hover:bg-background/70 hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  <span className="text-xs opacity-75">
                    {counts[tab.value]}
                  </span>
                </Link>
              );
            })}
          </nav>
          <form
            action="/orders"
            method="get"
            role="search"
            className="relative flex w-full min-w-0 sm:max-w-xs sm:flex-1"
          >
            {status !== "all" && (
              <input type="hidden" name="status" value={status} />
            )}
            <SearchField
              id="orders-search"
              name="q"
              label="Search orders by order ID or customer"
              placeholder="Search orders or customers..."
              value={searchInput}
              onChange={setSearchInput}
              onClear={() => setSearchInput("")}
              clearLabel="Clear order search"
              submitLabel="Search orders"
            />
          </form>
        </div>

        <Table className="min-w-[760px]">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length ? (
              orders.map((order) => (
                <TableRow
                  key={order.id}
                  tabIndex={0}
                  aria-label={`View order ${order.id} for ${order.customer.name}`}
                  className="cursor-pointer focus-visible:outline-2 focus-visible:outline-ring"
                  onClick={() => setSelectedOrder(order)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedOrder(order);
                    }
                  }}
                >
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div className="min-w-40">
                      <p className="font-medium text-foreground">
                        {order.customer.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.customer.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <OrderStatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(order.date)}
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums">
                    {currencyFormatter.format(order.amount)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-28 text-center text-muted-foreground"
                >
                  No orders match your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex flex-col gap-3 border-t border-border/70 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-xs text-muted-foreground">
            Showing <span className="font-medium text-foreground">{rowStart}–{rowEnd}</span> of{" "}
            <span className="font-medium text-foreground">{total}</span>{" "}
            {total === 1 ? "order" : "orders"}
          </p>
          <nav aria-label="Order pages" className="flex items-center gap-1">
            {page > 1 ? (
              <Link
                href={getPageHref(page - 1)}
                aria-label="Previous page"
                className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ChevronLeft aria-hidden="true" className="size-4" />
              </Link>
            ) : (
              <span
                aria-disabled="true"
                className="inline-flex size-8 items-center justify-center rounded-lg border border-border/60 text-muted-foreground/40"
              >
                <ChevronLeft aria-hidden="true" className="size-4" />
              </span>
            )}
            {visiblePages.map((pageNumber) => (
              <Link
                key={pageNumber}
                href={getPageHref(pageNumber)}
                aria-current={pageNumber === page ? "page" : undefined}
                aria-label={`Page ${pageNumber}`}
                className={`inline-flex size-8 items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                  pageNumber === page
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {pageNumber}
              </Link>
            ))}
            {page < totalPages ? (
              <Link
                href={getPageHref(page + 1)}
                aria-label="Next page"
                className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ChevronRight aria-hidden="true" className="size-4" />
              </Link>
            ) : (
              <span
                aria-disabled="true"
                className="inline-flex size-8 items-center justify-center rounded-lg border border-border/60 text-muted-foreground/40"
              >
                <ChevronRight aria-hidden="true" className="size-4" />
              </span>
            )}
          </nav>
        </div>
      </section>

      <Sheet
        open={selectedOrder !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedOrder(null);
          }
        }}
      >
        <SheetContent className="w-[min(440px,90vw)] overflow-y-auto p-0 sm:max-w-md">
          {selectedOrder && (
            <>
              <SheetHeader className="border-b border-border/70 p-6 pr-14">
                <SheetTitle className="text-lg">
                  Order {selectedOrder.id}
                </SheetTitle>
                <SheetDescription>
                  Placed {formatDate(selectedOrder.date)}
                </SheetDescription>
                <div className="pt-2">
                  <OrderStatusBadge status={selectedOrder.status} />
                </div>
              </SheetHeader>
              <div className="space-y-7 p-6">
                <section aria-labelledby="order-customer-heading">
                  <h3
                    id="order-customer-heading"
                    className="text-sm font-semibold"
                  >
                    Customer
                  </h3>
                  <p className="mt-2 text-sm">{selectedOrder.customer.name}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {selectedOrder.customer.email}
                  </p>
                </section>

                <section aria-labelledby="order-items-heading">
                  <h3
                    id="order-items-heading"
                    className="text-sm font-semibold"
                  >
                    Items
                  </h3>
                  <ul className="mt-3 divide-y divide-border/70">
                    {selectedOrder.items.map((item) => (
                      <li
                        key={item.sku}
                        className="flex items-start justify-between gap-4 py-3"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {item.sku} · Qty {item.quantity}
                          </p>
                        </div>
                        <p className="shrink-0 text-sm tabular-nums">
                          {currencyFormatter.format(item.unitPrice)}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between border-t border-border/70 pt-4 text-sm font-semibold">
                    <span>Total</span>
                    <span className="tabular-nums">
                      {currencyFormatter.format(selectedOrder.amount)}
                    </span>
                  </div>
                </section>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
