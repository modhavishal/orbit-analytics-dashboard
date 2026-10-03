"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { VisitorPoint } from "@/features/analytics/types";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

function formatDate(value: string): string {
  return dateFormatter.format(new Date(`${value}T00:00:00Z`));
}

export function VisitorLineChart({ data }: { data: VisitorPoint[] }) {
  return (
    <div className="h-[260px] w-full sm:h-[300px]" aria-label="Visitors over time">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 12, right: 8, bottom: 0, left: 4 }}
          accessibilityLayer
        >
          <CartesianGrid
            vertical={false}
            stroke="var(--border)"
            strokeDasharray="4 4"
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
            tickFormatter={formatDate}
            tickMargin={12}
            minTickGap={24}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
            width={42}
          />
          <Tooltip
            labelFormatter={(label) => formatDate(String(label))}
            cursor={{ stroke: "var(--border)" }}
            contentStyle={{
              backgroundColor: "var(--popover)",
              borderColor: "var(--border)",
              borderRadius: "0.75rem",
              color: "var(--popover-foreground)",
              fontSize: "0.75rem",
            }}
            formatter={(value) => [
              `${Number(value).toLocaleString("en-US")} visitors`,
              "Visitors",
            ]}
          />
          <Line
            type="monotone"
            dataKey="visitors"
            stroke="var(--chart-1)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0, fill: "var(--chart-1)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
