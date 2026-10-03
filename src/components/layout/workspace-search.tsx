"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { SearchField } from "@/components/ui/search-field";
import { customerOrders, customers } from "@/lib/mock-data";

type SearchResult = {
  href: string;
  title: string;
  detail: string;
  category: string;
};

const pages: SearchResult[] = [
  { href: "/", title: "Overview", detail: "Dashboard summary", category: "Pages" },
  { href: "/customers", title: "Customers", detail: "Browse your customers", category: "Pages" },
  { href: "/orders", title: "Orders", detail: "Review recent orders", category: "Pages" },
  { href: "/analytics", title: "Analytics", detail: "Explore business metrics", category: "Pages" },
  { href: "/settings", title: "Settings", detail: "Manage your preferences", category: "Pages" },
];

export function WorkspaceSearch() {
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const normalizedQuery = query.trim().toLocaleLowerCase();

  useEffect(() => {
    function closeOnOutsidePointer(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !searchRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () =>
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, []);

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      const target = event.target;
      if (
        event.key === "/" &&
        !(target instanceof HTMLElement && (
          target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
        ))
      ) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }

    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  const results = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    const pageResults = pages.filter((page) =>
      `${page.title} ${page.detail}`.toLocaleLowerCase().includes(normalizedQuery),
    );
    const customerResults = customers
      .filter((customer) =>
        `${customer.id} ${customer.name} ${customer.email}`
          .toLocaleLowerCase()
          .includes(normalizedQuery),
      )
      .slice(0, 4)
      .map<SearchResult>((customer) => ({
        href: `/customers/${customer.id}`,
        title: customer.name,
        detail: customer.email,
        category: "Customers",
      }));
    const customerById = new Map(customers.map((customer) => [customer.id, customer]));
    const orderResults = customerOrders
      .map((order) => ({ order, customer: customerById.get(order.customerId) }))
      .filter(
        ({ order, customer }) =>
          customer &&
          `${order.id} ${order.description} ${customer.name} ${customer.email}`
            .toLocaleLowerCase()
            .includes(normalizedQuery),
      )
      .slice(0, 4)
      .map<SearchResult>(({ order, customer }) => ({
        href: `/orders?q=${encodeURIComponent(order.id)}`,
        title: order.id,
        detail: customer?.name ?? "Order",
        category: "Orders",
      }));

    return [...pageResults, ...customerResults, ...orderResults].slice(0, 8);
  }, [normalizedQuery]);

  function closeResults() {
    setIsOpen(false);
  }

  function selectResult(href: string) {
    setQuery("");
    closeResults();
    router.push(href);
  }

  function clearSearch() {
    setQuery("");
    closeResults();
    inputRef.current?.focus();
  }

  return (
    <div
      ref={searchRef}
      className="relative w-[min(42vw,360px)] min-w-36 sm:w-60 lg:w-80"
    >
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          const firstResult = results[0];
          if (firstResult) {
            selectResult(firstResult.href);
          }
        }}
        className="relative"
      >
        <SearchField
          id="workspace-search"
          label="Search pages, customers, and orders"
          placeholder="Search anything..."
          value={query}
          onChange={setQuery}
          onClear={clearSearch}
          clearLabel="Clear workspace search"
          submitLabel="Search workspace"
          inputRef={inputRef}
          role="combobox"
          ariaAutocomplete="list"
          ariaExpanded={isOpen && normalizedQuery.length > 0}
          ariaControls="workspace-search-results"
          onFocus={() => setIsOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              closeResults();
              inputRef.current?.blur();
            }
          }}
        />
      </form>

      {isOpen && normalizedQuery ? (
        <div
          id="workspace-search-results"
          role="listbox"
          aria-label="Search results"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 max-h-[min(60vh,28rem)] w-[min(90vw,24rem)] overflow-y-auto rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-xl"
        >
          {results.length ? (
            results.map((result) => (
              <Link
                key={`${result.category}-${result.href}`}
                href={result.href}
                role="option"
                aria-selected="false"
                onClick={() => {
                  setQuery("");
                  closeResults();
                }}
                className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 outline-none transition-colors hover:bg-accent focus-visible:bg-accent"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">
                    {result.title}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {result.detail}
                  </span>
                </span>
                <span className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  {result.category}
                </span>
              </Link>
            ))
          ) : (
            <p className="px-3 py-4 text-center text-sm text-muted-foreground">
              No pages, customers, or orders match “{query.trim()}”.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
