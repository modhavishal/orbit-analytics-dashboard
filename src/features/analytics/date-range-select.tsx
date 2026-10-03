"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AnalyticsRange } from "@/features/analytics/types";

const options: { value: AnalyticsRange; label: string }[] = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
];

export function DateRangeSelect({ value }: { value: AnalyticsRange }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateRange(nextRange: string | null) {
    if (!nextRange) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("range", nextRange);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <Select value={value} onValueChange={updateRange}>
      <SelectTrigger aria-label="Select analytics date range">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
