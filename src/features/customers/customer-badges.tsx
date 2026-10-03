import { Badge } from "@/components/ui/badge";
import type { CustomerPlan, CustomerStatus } from "@/features/customers/types";

const planStyles: Record<CustomerPlan, string> = {
  free: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  pro: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  team: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
};

const statusStyles: Record<CustomerStatus, string> = {
  active:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  inactive: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};

export function PlanBadge({ plan }: { plan: CustomerPlan }) {
  return (
    <Badge className={`capitalize ${planStyles[plan]}`} variant="secondary">
      {plan}
    </Badge>
  );
}

export function CustomerStatusBadge({ status }: { status: CustomerStatus }) {
  return (
    <Badge className={`capitalize ${statusStyles[status]}`} variant="secondary">
      {status}
    </Badge>
  );
}
