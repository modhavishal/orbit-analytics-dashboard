"use client";

import Link from "next/link";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    toast.error("A problem occurred while loading Orbit.", {
      id: error.digest ?? "global-error",
    });
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-background px-4 py-10 text-foreground">
        <Toaster position="top-right" />
        <main className="mx-auto flex max-w-lg flex-col items-center rounded-2xl border border-border/80 bg-card p-8 text-center shadow-sm shadow-slate-950/[0.02]">
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Try again
            </button>
            <Link
              href="/"
              className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Return home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
