import Search from "src/components/search";
import { SearchResponse, search } from "src/data/search";

export default async function SearchPage({ searchParams }) {
  const { query } = searchParams;
  let searchResponse: SearchResponse = {};
  if (query) {
    searchResponse = await search(query);
  }

  return <Search query={query} searchResponse={searchResponse} />;
}
