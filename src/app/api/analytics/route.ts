import { getAnalyticsData } from "@/features/analytics/data";
import type { AnalyticsRange } from "@/features/analytics/types";

const ranges = new Set<AnalyticsRange>(["7d", "30d", "90d"]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get("range") ?? "30d";

  if (!ranges.has(range as AnalyticsRange)) {
    return Response.json(
      { error: "Range must be one of 7d, 30d, or 90d." },
      { status: 400 },
    );
  }

  return Response.json(getAnalyticsData(range as AnalyticsRange));
}
