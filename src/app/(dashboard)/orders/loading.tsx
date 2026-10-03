import { Skeleton } from "@/components/ui/skeleton";

export default function OrdersLoading() {
  return (
    <div className="space-y-6" aria-label="Loading orders">
      <div className="space-y-2">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-64 max-w-full" />
      </div>
      <div className="overflow-hidden rounded-xl border border-border/80 bg-card">
        <div className="space-y-4 border-b border-border/70 p-4 sm:p-5">
          <div className="flex gap-2">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="h-9 w-20" />
            ))}
          </div>
          <Skeleton className="h-9 w-full sm:max-w-sm" />
        </div>
        <div className="space-y-4 p-4 sm:p-5">
          {Array.from({ length: 7 }, (_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
