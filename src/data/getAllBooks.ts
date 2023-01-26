import { groq } from "next-sanity";
import Sanity from "src/providers/sanity";
import { Source } from "src/types/source";

const GET_ALL_SOURCES = groq`*[_type == "source" && type == "book"] | order(_createdAt desc){
  _id,
  _createdAt,
  type,
  title,
  subtitle,
  author,
  "imageUrl": cover.asset->url,
  url,
  isbn
}
`;

export default async function getAllSources() {
  return Sanity.fetch<Source[]>(GET_ALL_SOURCES);
}
