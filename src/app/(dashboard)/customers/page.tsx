import { CustomersTable } from "@/features/customers/customers-table";
import {
  getCustomers,
  getFilteredCustomers,
  parseCustomerQuery,
} from "@/features/customers/data";

type CustomersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CustomersPage({
  searchParams,
}: CustomersPageProps) {
  const queryParams = new URLSearchParams();
  for (const [key, value] of Object.entries(await searchParams)) {
    const firstValue = Array.isArray(value) ? value[0] : value;
    if (firstValue) {
      queryParams.set(key, firstValue);
    }
  }

  const query = parseCustomerQuery(queryParams);
  const result = getCustomers(query);
  const exportData = getFilteredCustomers(query);

  return (
    <CustomersTable
      key={JSON.stringify(query)}
      result={result}
      exportData={exportData}
      query={query}
    />
  );
}
