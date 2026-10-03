import { getCustomers, parseCustomerQuery } from "@/features/customers/data";

export function GET(request: Request) {
  const url = new URL(request.url);
  const query = parseCustomerQuery(url.searchParams);

  return Response.json(getCustomers(query));
}
