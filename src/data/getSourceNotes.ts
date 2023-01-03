import { groq } from "next-sanity";
import Sanity from "src/providers/sanity";
import { Note } from "src/types/note";

export default async function getSource(id: string) {
  const GET_SOURCE_NOTES = groq`*[_type=='note' && references('${id}')] {
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
  }`;
  return Sanity.fetch<Note[]>(GET_SOURCE_NOTES);
}
