import { groq } from "next-sanity";
import Sanity from "src/providers/sanity";
import { Note } from "src/types/note";

const GET_NON_BOOK_NOTES = groq`*[_type == "note" && source->type != "book"] | order(_createdAt desc) {
  _id,
  _type,
  _createdAt,
  title,
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

export default async function getNonBookNotes() {
  return Sanity.fetch<Note[]>(GET_NON_BOOK_NOTES);
}
