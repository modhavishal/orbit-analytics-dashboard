import { Skeleton } from "@/components/ui/skeleton";

export default function CustomersLoading() {
  return (
    <div className="space-y-5" aria-label="Loading customers">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-2">
          <Skeleton className="h-4 w-64 max-w-full" />
          <Skeleton className="h-8 w-44" />
        </div>
        <Skeleton className="h-9 w-28" />
      </div>
      <div className="overflow-hidden rounded-xl border border-border/80 bg-card">
        <div className="flex flex-col gap-3 border-b border-border/70 p-4 sm:flex-row">
          <Skeleton className="h-8 w-full sm:max-w-sm" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-36" />
        </div>
        <div className="space-y-4 p-4">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
