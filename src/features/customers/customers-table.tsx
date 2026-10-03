"use client";

import {
  createColumnHelper,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  Download,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchField } from "@/components/ui/search-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CustomerStatusBadge,
  PlanBadge,
} from "@/features/customers/customer-badges";
import type {
  Customer,
  CustomerListResult,
  CustomerQuery,
  CustomerSortField,
} from "@/features/customers/types";

const features = tableFeatures({});
const columnHelper = createColumnHelper<typeof features, Customer>();
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
const sortableFields = new Set<CustomerSortField>([
  "name",
  "email",
  "plan",
  "status",
  "country",
  "joinedAt",
  "totalSpent",
]);

function formatDate(value: string): string {
  const [year, month, day] = value.split("-").map(Number);
  return dateFormatter.format(new Date(year, month - 1, day));
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function escapeCsv(value: string | number): string {
  const rawValue = String(value);
  const safeValue = /^[\t\r ]*[=+\-@]/.test(rawValue) ? `'${rawValue}` : rawValue;
  return `"${safeValue.replaceAll('"', '""')}"`;
}

const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "Customer",
    cell: ({ row }) => (
      <div className="flex min-w-52 items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
          {getInitials(row.original.name)}
        </span>
        <div className="min-w-0">
          <Link
            href={`/customers/${row.original.id}`}
            className="font-medium text-foreground hover:text-primary"
            onClick={(event) => event.stopPropagation()}
          >
            {row.original.name}
          </Link>
          <p className="truncate text-xs text-muted-foreground">
            {row.original.email}
          </p>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("plan", {
    header: "Plan",
    cell: ({ getValue }) => <PlanBadge plan={getValue()} />,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => <CustomerStatusBadge status={getValue()} />,
  }),
  columnHelper.accessor("country", {
    header: "Country",
  }),
  columnHelper.accessor("joinedAt", {
    header: "Joined",
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">{formatDate(getValue())}</span>
    ),
  }),
  columnHelper.accessor("totalSpent", {
    header: "Total spent",
    cell: ({ getValue }) => (
      <span className="font-medium tabular-nums">
        {currencyFormatter.format(getValue())}
      </span>
    ),
  }),
]);

type CustomersTableProps = {
  result: CustomerListResult;
  exportData: Customer[];
  query: CustomerQuery;
};

function SortIcon({
  active,
  order,
}: {
  active: boolean;
  order: "asc" | "desc";
}) {
  if (!active) {
    return <ChevronsUpDown aria-hidden="true" className="size-3.5" />;
  }

  return order === "asc" ? (
    <ArrowUp aria-hidden="true" className="size-3.5" />
  ) : (
    <ArrowDown aria-hidden="true" className="size-3.5" />
  );
}

export function CustomersTable({
  result,
  exportData,
  query,
}: CustomersTableProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const [searchTerm, setSearchTerm] = useState(query.q ?? "");
  const searchTimeout = useRef<number | null>(null);
  const table = useTable({ features, columns, data: result.customers });

  const updateUrl = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParamsString);
      for (const [key, value] of Object.entries(updates)) {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }

      const queryString = params.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParamsString],
  );

  useEffect(() => {
    const trimmedSearch = searchTerm.trim();
    if (trimmedSearch === (query.q ?? "")) {
      return;
    }

    searchTimeout.current = window.setTimeout(() => {
      updateUrl({ q: trimmedSearch || undefined, page: "1" });
    }, 300);

    return () => {
      if (searchTimeout.current !== null) {
        window.clearTimeout(searchTimeout.current);
        searchTimeout.current = null;
      }
    };
  }, [query.q, searchParamsString, searchTerm, updateUrl]);

  function clearSearch() {
    if (searchTimeout.current !== null) {
      window.clearTimeout(searchTimeout.current);
      searchTimeout.current = null;
    }
    setSearchTerm("");
    updateUrl({ q: undefined, page: undefined });
  }

  function updatePlan(value: string | null) {
    updateUrl({
      plan: value && value !== "all" ? value : undefined,
      page: "1",
    });
  }

  function updateStatus(value: string | null) {
    updateUrl({
      status: value && value !== "all" ? value : undefined,
      page: "1",
    });
  }

  function updateSort(columnId: string) {
    if (!sortableFields.has(columnId as CustomerSortField)) {
      return;
    }

    const sort = columnId as CustomerSortField;
    const order =
      query.sort === sort && query.order === "asc" ? "desc" : "asc";
    updateUrl({ sort, order, page: "1" });
  }

  function exportCsv() {
    const headings = [
      "Name",
      "Email",
      "Plan",
      "Status",
      "Country",
      "Joined",
      "Total spent",
    ];
    const rows = exportData.map((customer) => [
      customer.name,
      customer.email,
      customer.plan,
      customer.status,
      customer.country,
      customer.joinedAt,
      customer.totalSpent.toFixed(2),
    ]);
    const csv = [headings, ...rows]
      .map((row) => row.map(escapeCsv).join(","))
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "customers.csv";
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function getPageNumbers(): number[] {
    const maxVisiblePages = 7;
    const start = Math.max(
      1,
      Math.min(query.page - 3, result.totalPages - maxVisiblePages + 1),
    );
    const end = Math.min(result.totalPages, start + maxVisiblePages - 1);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  const rowStart = result.total === 0 ? 0 : (result.page - 1) * result.pageSize + 1;
  const rowEnd = Math.min(result.page * result.pageSize, result.total);

  return (
    <section className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm text-muted-foreground">
            Get to know the people behind your business.
          </p>
          <h2 className="mt-1.5 text-2xl font-semibold tracking-[-0.04em] sm:text-[28px]">
            Customers
          </h2>
        </div>
        <Button
          variant="outline"
          disabled={exportData.length === 0}
          onClick={exportCsv}
        >
          <Download aria-hidden="true" />
          Export CSV
        </Button>
      </div>

      <div className="rounded-xl border border-border/80 bg-card shadow-sm shadow-slate-950/[0.025] dark:shadow-black/10">
        <div className="flex flex-col gap-3 border-b border-border/70 p-4 sm:flex-row sm:items-center sm:p-5">
          <form
            action="/customers"
            method="get"
            role="search"
            className="w-full sm:max-w-sm"
            onSubmit={(event) => {
              event.preventDefault();
              if (searchTimeout.current !== null) {
                window.clearTimeout(searchTimeout.current);
                searchTimeout.current = null;
              }
              updateUrl({ q: searchTerm.trim() || undefined, page: "1" });
            }}
          >
            <SearchField
              id="customer-search"
              name="q"
              label="Search customers by name or email"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={setSearchTerm}
              onClear={clearSearch}
              clearLabel="Clear customer search"
              submitLabel="Search customers"
            />
          </form>
          <div className="flex gap-2">
            <Select value={query.plan ?? "all"} onValueChange={updatePlan}>
              <SelectTrigger aria-label="Filter by plan" className="w-full sm:w-32">
                <SelectValue placeholder="All plans" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All plans</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="team">Team</SelectItem>
              </SelectContent>
            </Select>
            <Select value={query.status ?? "all"} onValueChange={updateStatus}>
              <SelectTrigger
                aria-label="Filter by status"
                className="w-full sm:w-36"
              >
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table className="min-w-[900px]">
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id} className="hover:bg-transparent">
                {group.headers.map((header) => {
                  const isActive = header.column.id === query.sort;

                  return (
                    <TableHead
                      key={header.id}
                      aria-sort={
                        isActive
                          ? query.order === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                      }
                    >
                      <button
                        type="button"
                        onClick={() => updateSort(header.column.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <table.FlexRender header={header} />
                        <SortIcon active={isActive} order={query.order} />
                      </button>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/customers/${row.original.id}`)}
                >
                  {row.getAllCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3.5">
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-40 text-center whitespace-normal"
                >
                  <div className="space-y-1">
                    <p className="font-medium">No customers found</p>
                    <p className="text-sm text-muted-foreground">
                      Try changing your search or filters.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex flex-col gap-3 border-t border-border/70 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            Showing {rowStart}–{rowEnd} of {result.total} customers
          </p>
          <nav aria-label="Customer pages" className="flex flex-wrap items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              disabled={result.page <= 1}
              onClick={() => updateUrl({ page: String(result.page - 1) })}
            >
              Previous
            </Button>
            {getPageNumbers().map((page) => (
              <Button
                key={page}
                variant={page === result.page ? "secondary" : "ghost"}
                size="icon-sm"
                aria-current={page === result.page ? "page" : undefined}
                aria-label={`Page ${page}`}
                onClick={() => updateUrl({ page: String(page) })}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              disabled={result.page >= result.totalPages}
              onClick={() => updateUrl({ page: String(result.page + 1) })}
            >
              Next
            </Button>
          </nav>
        </div>
      </div>
    </section>
  );
}
