"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { TrafficSource } from "@/features/overview/types";

const chartColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
];

export function TrafficSourcesDonutChart({
  data,
  totalOrders,
}: {
  data: TrafficSource[];
  totalOrders: number;
}) {
  return (
    <>
      <div className="relative mx-auto h-[210px] w-full max-w-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart accessibilityLayer>
            <Pie
              data={data}
              dataKey="sessions"
              nameKey="name"
              innerRadius="66%"
              outerRadius="88%"
              paddingAngle={3}
              stroke="none"
            >
              {data.map((source, index) => (
                <Cell key={source.name} fill={chartColors[index % chartColors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--popover)",
                borderColor: "var(--border)",
                borderRadius: "0.75rem",
                color: "var(--popover-foreground)",
                fontSize: "0.75rem",
              }}
              formatter={(value) => [
                `${Number(value).toLocaleString("en-US")} sessions`,
                "Traffic",
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold tracking-tight">
            {totalOrders.toLocaleString("en-US")}
          </span>
          <span className="mt-0.5 text-[10px] text-muted-foreground">
            Total orders
          </span>
        </div>
      </div>
      <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-3">
        {data.map((source, index) => (
          <li
            key={source.name}
            className="flex min-w-0 items-center justify-between gap-2 text-xs"
          >
            <span className="flex min-w-0 items-center gap-2 text-muted-foreground">
              <span
                aria-hidden="true"
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: chartColors[index % chartColors.length] }}
              />
              <span className="truncate">{source.name}</span>
            </span>
            <span className="shrink-0 font-medium text-foreground">
              {source.percentage}%
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
