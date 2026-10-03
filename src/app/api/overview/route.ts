import { getOverviewData } from "@/lib/mock-data";

export async function GET() {
  const overview = await getOverviewData();

  return Response.json(overview);
}
