import { type NextRequest, NextResponse } from "next/server";
import { SearchResponse, search } from "src/data/search";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") ?? "";
  const response = await search(query);
  return NextResponse.json<SearchResponse>(response);
}
