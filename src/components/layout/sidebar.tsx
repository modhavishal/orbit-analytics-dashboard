import Link from "next/link";
import { Orbit } from "lucide-react";
import { NavLinks } from "@/components/layout/nav-links";

export function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className="flex items-center gap-2.5 rounded-lg text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/20">
        <Orbit aria-hidden="true" className="size-5" strokeWidth={2.2} />
      </span>
      <span className="text-[19px] font-semibold tracking-[-0.04em]">Orbit</span>
    </Link>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[250px] flex-col border-r border-sidebar-border bg-sidebar px-5 py-6 lg:flex">
      <Brand />
      <div className="mt-10 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        Workspace
      </div>
      <div className="mt-3">
        <NavLinks />
      </div>
      <div className="mt-auto rounded-2xl border border-sidebar-border bg-background/70 p-4">
        <p className="text-sm font-medium">Need a hand?</p>
        <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
          Explore the help center for tips and answers.
        </p>
        <Link
          href="/settings"
          className="mt-3 inline-flex text-xs font-semibold text-primary transition-colors hover:text-primary/80"
        >
          Visit help center
        </Link>
      </div>
      <div className="mt-5 flex items-center gap-2 px-1 text-xs text-muted-foreground">
        <span className="size-2 rounded-full bg-emerald-500" />
        All systems operational
      </div>
    </aside>
  );
}
