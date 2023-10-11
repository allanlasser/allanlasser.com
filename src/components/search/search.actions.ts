"use server";

import { search, SearchResponse } from "src/data/search";

export type SearchAction = SearchResponse;

export async function searchAction(
  prevState: SearchAction,
  formData: FormData
): Promise<SearchAction> {
  const query = formData.get("query")?.toString() ?? "";
  return search(query);
}
