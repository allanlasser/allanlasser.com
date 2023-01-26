import { groq } from "next-sanity";
import Sanity from "src/providers/sanity";
import { Source } from "src/types/source";

export default async function getSource(id: string) {
  const GET_SOURCE = groq`*[_type == "source" && _id == "${id}"][0] {
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
  return Sanity.fetch<Source>(GET_SOURCE);
}
