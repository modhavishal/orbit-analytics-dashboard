import {
  customerOrders,
  customers,
} from "@/lib/mock-data";
import type {
  Customer,
  CustomerListResult,
  CustomerOrder,
  CustomerPlan,
  CustomerQuery,
  CustomerSortField,
  CustomerStatus,
} from "@/features/customers/types";

const MAX_PAGE_SIZE = 100;
const sortFields = new Set<CustomerSortField>([
  "name",
  "email",
  "plan",
  "status",
  "country",
  "joinedAt",
  "totalSpent",
]);
const planValues = new Set<CustomerPlan>(["free", "pro", "team"]);
const statusValues = new Set<CustomerStatus>(["active", "inactive"]);

function positiveInteger(value: string | null, fallback: number, max: number): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? Math.min(parsed, max) : fallback;
}

export function parseCustomerQuery(params: URLSearchParams): CustomerQuery {
  const plan = params.get("plan");
  const status = params.get("status");
  const sort = params.get("sort");
  const order = params.get("order");

  return {
    q: params.get("q")?.trim() || undefined,
    plan: plan && planValues.has(plan as CustomerPlan) ? (plan as CustomerPlan) : undefined,
    status:
      status && statusValues.has(status as CustomerStatus)
        ? (status as CustomerStatus)
        : undefined,
    sort: sort && sortFields.has(sort as CustomerSortField) ? (sort as CustomerSortField) : "joinedAt",
    order: order === "asc" ? "asc" : "desc",
    page: positiveInteger(params.get("page"), 1, Number.MAX_SAFE_INTEGER),
    pageSize: positiveInteger(params.get("pageSize"), 10, MAX_PAGE_SIZE),
  };
}

function compareCustomers(
  first: Customer,
  second: Customer,
  sort: CustomerSortField,
): number {
  if (sort === "totalSpent") {
    return first.totalSpent - second.totalSpent;
  }

  return first[sort].localeCompare(second[sort]);
}

export function getFilteredCustomers(query: CustomerQuery): Customer[] {
  const search = query.q?.toLocaleLowerCase();

  return customers
    .filter((customer) => {
      const matchesSearch =
        !search ||
        customer.name.toLocaleLowerCase().includes(search) ||
        customer.email.toLocaleLowerCase().includes(search);

      return (
        matchesSearch &&
        (!query.plan || customer.plan === query.plan) &&
        (!query.status || customer.status === query.status)
      );
    })
    .sort((first, second) => {
      const result = compareCustomers(first, second, query.sort);
      return query.order === "asc" ? result : -result;
    });
}

export function getCustomers(query: CustomerQuery): CustomerListResult {
  const filteredCustomers = getFilteredCustomers(query);
  const total = filteredCustomers.length;
  const totalPages = Math.max(1, Math.ceil(total / query.pageSize));
  const page = Math.min(query.page, totalPages);
  const start = (page - 1) * query.pageSize;

  return {
    customers: filteredCustomers.slice(start, start + query.pageSize),
    total,
    page,
    pageSize: query.pageSize,
    totalPages,
  };
}

export function getCustomerById(id: string): Customer | undefined {
  return customers.find((customer) => customer.id === id);
}

export function getRecentCustomerOrders(customerId: string): CustomerOrder[] {
  return customerOrders
    .filter((order) => order.customerId === customerId)
    .sort((first, second) => second.date.localeCompare(first.date))
    .slice(0, 5);
}
