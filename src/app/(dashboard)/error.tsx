"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    toast.error("Something went wrong while loading your dashboard.", {
      id: error.digest ?? "dashboard-error",
    });
  }, [error]);

  return (
    <section
      aria-label="Dashboard recovery"
      className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-border/80 bg-card px-6 py-12 text-center"
    >
      <Button className="gap-2" onClick={() => retry()}>
        <RefreshCw aria-hidden="true" className="size-4" />
        Try again
      </Button>
    </section>
  );
}
