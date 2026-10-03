import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function CustomerNotFound() {
  return (
    <div className="mx-auto flex min-h-80 max-w-lg flex-col items-center justify-center text-center">
      <p className="text-sm font-medium text-primary">Customer not found</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
        We couldn&apos;t find that customer
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        The customer may have been removed or the link may be incorrect.
      </p>
      <Link
        href="/customers"
        className={`${buttonVariants()} mt-5`}
      >
        Back to customers
      </Link>
    </div>
  );
}
