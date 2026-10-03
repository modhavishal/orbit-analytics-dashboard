"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/": "Overview",
  "/customers": "Customers",
  "/orders": "Orders",
  "/analytics": "Analytics",
  "/settings": "Settings",
};

export function PageTitle() {
  const pathname = usePathname();
  const title =
    pageTitles[pathname] ??
    (pathname.startsWith("/customers/") ? "Customers" : "Overview");

  return (
    <div className="min-w-0">
      <p className="text-[11px] font-medium text-muted-foreground">
        Workspace <span className="mx-1.5 text-border">/</span>
        <span className="text-foreground/80">{title}</span>
      </p>
      <h1 className="mt-0.5 truncate text-lg font-semibold tracking-[-0.025em] sm:text-xl">
        {title}
      </h1>
    </div>
  );
}
