import { NextResponse } from "next/server";
import { executeCredenceProjectsQuery } from "@/lib/credenceProjectsStaticCore";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const result = executeCredenceProjectsQuery(searchParams);
  if (result.success) {
    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=900",
      },
    });
  }
  return NextResponse.json(result, { status: 500 });
}
