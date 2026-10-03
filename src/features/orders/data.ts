import { customerOrders, customers } from "@/lib/mock-data";
import type { Order, OrderStatusFilter } from "@/features/orders/types";

const products = [
  { name: "Orbit Pro subscription", sku: "ORB-PRO-MO" },
  { name: "Orbit Team subscription", sku: "ORB-TEAM-MO" },
  { name: "Additional team seats", sku: "ORB-SEATS-05" },
  { name: "Priority support", sku: "ORB-SUPPORT" },
];

export function getOrders(): Order[] {
  const customerById = new Map(customers.map((customer) => [customer.id, customer]));

  return customerOrders.flatMap((order, index) => {
    const customer = customerById.get(order.customerId);
    if (!customer) {
      return [];
    }

    const product = products[index % products.length];
    const firstItemPrice = Number((order.amount * 0.7).toFixed(2));

    return [
      {
        id: order.id,
        customer: {
          id: customer.id,
          name: customer.name,
          email: customer.email,
        },
        amount: order.amount,
        status: order.status,
        date: order.date,
        items: [
          {
            ...product,
            quantity: 1,
            unitPrice: firstItemPrice,
          },
          {
            name: order.description,
            sku: `ORB-ADD-${index + 1}`,
            quantity: 1,
            unitPrice: Number((order.amount - firstItemPrice).toFixed(2)),
          },
        ],
      },
    ];
  }).sort((first, second) => second.date.localeCompare(first.date));
}

export function filterOrders(
  orders: Order[],
  status: OrderStatusFilter,
  search: string,
): Order[] {
  const normalizedSearch = search.trim().toLocaleLowerCase();

  return orders.filter((order) => {
    const matchesStatus = status === "all" || order.status === status;
    const matchesSearch =
      !normalizedSearch ||
      order.id.toLocaleLowerCase().includes(normalizedSearch) ||
      order.customer.name.toLocaleLowerCase().includes(normalizedSearch) ||
      order.customer.email.toLocaleLowerCase().includes(normalizedSearch);

    return matchesStatus && matchesSearch;
  });
}
