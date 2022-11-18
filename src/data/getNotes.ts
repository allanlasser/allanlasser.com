import { groq } from "next-sanity";
import Sanity from "src/providers/sanity";
import { Note } from "src/types/note";

const GET_NOTES = groq`*[_type == "note"] | order(_createdAt desc) {
  _id,
  _createdAt,
  body,
  page,
  source -> {
    _id,
    type,
    title,
    url
  }
}
`;

export default async function getNotes() {
  return Sanity.fetch<Note[]>(GET_NOTES);
}
