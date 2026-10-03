"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  LayoutDashboard,
  Settings2,
  ShoppingBag,
  UsersRound,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/", icon: LayoutDashboard },
  { label: "Customers", href: "/customers", icon: UsersRound },
  { label: "Orders", href: "/orders", icon: ShoppingBag },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings2 },
];

export function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="space-y-1">
      {navItems.map(({ label, href, icon: Icon }) => {
        const isActive =
          pathname === href ||
          (href !== "/" && pathname.startsWith(`${href}/`));

        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/75 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground"
            }`}
          >
            <Icon
              aria-hidden="true"
              className={`size-[18px] transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-sidebar-foreground"
              }`}
              strokeWidth={1.8}
            />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
