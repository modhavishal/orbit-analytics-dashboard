import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsLoading() {
  return (
    <div className="space-y-6" aria-label="Loading analytics">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </div>
        <Skeleton className="h-8 w-36" />
      </section>
      <section className="grid gap-5 xl:grid-cols-2">
        {Array.from({ length: 2 }, (_, index) => (
          <div
            key={index}
            className="rounded-xl border border-border/80 bg-card p-5 sm:p-6"
          >
            <Skeleton className="h-5 w-36" />
            <Skeleton className="mt-2 h-3 w-56" />
            <Skeleton className="mt-6 h-[260px] w-full sm:h-[300px]" />
          </div>
        ))}
      </section>
      <div className="overflow-hidden rounded-xl border border-border/80 bg-card">
        <div className="space-y-2 p-5">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-64 max-w-full" />
        </div>
        <div className="space-y-4 border-t border-border/70 p-5">
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={index} className="h-9 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
