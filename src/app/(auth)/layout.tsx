import type { ReactNode } from "react";
import Link from "next/link";
import { Orbit } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"
      />
      <div className="relative w-full max-w-md">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2.5 text-foreground"
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/20">
            <Orbit aria-hidden="true" className="size-5" />
          </span>
          <span className="text-xl font-semibold tracking-tight">Orbit</span>
        </Link>
        {children}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Secure workspace access powered by Supabase
        </p>
      </div>
    </main>
  );
}
