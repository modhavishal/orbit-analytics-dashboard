import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/features/orders/types";

const statusStyles: Record<OrderStatus, string> = {
  paid: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  pending: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  refunded: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <Badge className={`capitalize ${statusStyles[status]}`} variant="secondary">
      {status}
    </Badge>
  );
}
