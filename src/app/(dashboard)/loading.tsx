import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-7" aria-label="Loading overview">
      <div className="space-y-2">
        <Skeleton className="h-4 w-64 max-w-full" />
        <Skeleton className="h-8 w-56 max-w-full" />
      </div>

      <section
        aria-label="Loading key metrics"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="rounded-xl border border-border/80 bg-card p-5"
          >
            <Skeleton className="h-4 w-28" />
            <Skeleton className="mt-5 h-8 w-36" />
            <Skeleton className="mt-2 h-3 w-24" />
          </div>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(260px,0.9fr)]">
        <div className="rounded-xl border border-border/80 bg-card p-5 sm:p-6">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="mt-2 h-3 w-52" />
          <Skeleton className="mt-7 h-[260px] w-full sm:h-[300px]" />
        </div>
        <div className="rounded-xl border border-border/80 bg-card p-5 sm:p-6">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-2 h-3 w-48" />
          <Skeleton className="mx-auto mt-6 size-[210px] rounded-full" />
          <div className="mt-5 grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </section>

      <div className="overflow-hidden rounded-xl border border-border/80 bg-card">
        <div className="p-5">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-2 h-3 w-56" />
        </div>
        <div className="space-y-4 border-t border-border/70 p-5">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="h-9 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
