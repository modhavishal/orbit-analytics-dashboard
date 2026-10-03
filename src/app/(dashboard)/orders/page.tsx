import { PageTitle } from "@/components/layout/page-title";
import { filterOrders, getOrders } from "@/features/orders/data";
import { OrdersTable } from "@/features/orders/orders-table";
import type { OrderStatusFilter } from "@/features/orders/types";

type OrdersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const statusFilters = new Set<OrderStatusFilter>([
  "all",
  "paid",
  "pending",
  "refunded",
]);

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const params = await searchParams;
  const rawStatus = Array.isArray(params.status)
    ? params.status[0]
    : params.status;
  const rawSearch = Array.isArray(params.q) ? params.q[0] : params.q;
  const rawPage = Array.isArray(params.page) ? params.page[0] : params.page;
  const status =
    rawStatus && statusFilters.has(rawStatus as OrderStatusFilter)
      ? (rawStatus as OrderStatusFilter)
      : "all";
  const search = rawSearch?.trim() ?? "";
  const parsedPage = Number.parseInt(rawPage ?? "", 10);
  const requestedPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const allOrders = getOrders();
  const matchingOrders = filterOrders(allOrders, "all", search);
  const filteredOrders = filterOrders(allOrders, status, search);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const page = Math.min(requestedPage, totalPages);
  const orders = filteredOrders.slice((page - 1) * pageSize, page * pageSize);
  const counts = {
    all: matchingOrders.length,
    paid: matchingOrders.filter((order) => order.status === "paid").length,
    pending: matchingOrders.filter((order) => order.status === "pending").length,
    refunded: matchingOrders.filter((order) => order.status === "refunded").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <PageTitle />
        <p className="text-sm text-muted-foreground">
          Review and manage your latest orders.
        </p>
      </div>
      <OrdersTable
        key={`${status}:${search}`}
        orders={orders}
        search={search}
        status={status}
        counts={counts}
        page={page}
        pageSize={pageSize}
        total={filteredOrders.length}
        totalPages={totalPages}
      />
    </div>
  );
}
