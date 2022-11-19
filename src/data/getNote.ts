import { groq } from "next-sanity";
import Sanity from "src/providers/sanity";
import { Note } from "src/types/note";

export default async function getNote(id: string) {
  const GET_NOTE = groq`*[_type == "note" && _id == "${id}"][0] {
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
  return Sanity.fetch<Note>(GET_NOTE);
}
