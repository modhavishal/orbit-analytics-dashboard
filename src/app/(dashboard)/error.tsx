"use client";

import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <section
      role="alert"
      className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-border/80 bg-card px-6 py-12 text-center"
    >
      <h2 className="text-lg font-semibold">We couldn&apos;t load your overview</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Something went wrong while loading your dashboard data. Please try
        again.
      </p>
      <Button className="mt-5 gap-2" onClick={() => retry()}>
        <RefreshCw aria-hidden="true" className="size-4" />
        Try again
      </Button>
    </section>
  );
}
