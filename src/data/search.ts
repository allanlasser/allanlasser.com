import { groq } from "next-sanity";
import Sanity from "src/providers/sanity";
import { BlockContent } from "src/providers/sanity/schema";

const TYPES = ["post", "note", "source"];

const SEARCH = groq`
  *[(title match $query || subtitle match $query || author match $query || body match $query || body[].children[].text match $query) && _type in $types] {
    _id,
    _type,
    type,
    slug,
    title,
    page,
    author,
    url,
    body,
    source->{
      type,
      title,
      author,
      url
    }
  }
`;

type Maybe<T> = T | null;

export interface SearchResult {
  _id: string;
  _type: string;
  type: Maybe<string>;
  slug: Maybe<{ current: string }>;
  title: Maybe<string>;
  page: Maybe<string>;
  author: Maybe<string>;
  url: Maybe<string>;
  body: Maybe<string | BlockContent>;
  source: Maybe<{
    type: string;
    title: string;
    author: Maybe<string>;
    url: Maybe<string>;
  }>;
}

export interface SearchResponse {
  results?: SearchResult[];
  error?: string;
}

export async function search(query: string): Promise<SearchResponse> {
  if (query.length < 2) return {};
  try {
    const results = await Sanity.fetch<
      SearchResult[],
      { query: string; types: string[] }
    >(SEARCH, {
      query: `*${query}*`,
      types: TYPES,
    });
    return { results, error: undefined };
  } catch (e) {
    return { error: String(e), results: undefined };
  }
}
