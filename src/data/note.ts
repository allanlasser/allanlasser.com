import { groq } from "next-sanity";
import Sanity from "src/providers/sanity";
import { Note } from "src/types/note";

/* Create */

export interface CreateNoteArgs {
  body: string;
  title?: string;
  page?: string;
  sourceId?: string;
}

/** Creates a note
 *
 *  To associate with a Source, create the source first and pass through its ID to create a reference.
 **/
export async function createNote(args: CreateNoteArgs): Promise<Partial<Note>> {
  const note = await Sanity.create<Partial<Note>>({
    _type: "note",
    body: args.body,
    title: args.title ?? null,
    page: args.page ?? null,
    source: args.sourceId
      ? {
          _type: "reference",
          _ref: args.sourceId,
        }
      : undefined,
  });
  return note;
}

/** Returns a single note given an ID */
export async function getNote(id: string) {
  const GET_NOTE = groq`*[_type == "note" && _id == "${id}"][0] {
    _id,
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
  return Sanity.fetch<Note>(GET_NOTE);
}

/** Returns all notes in reverse chronological order */
export async function getAllNotes() {
  const GET_ALL_NOTES = groq`*[_type == "note"] | order(_createdAt desc) {
    _id,
    _type,
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
  return Sanity.fetch<Note[]>(GET_ALL_NOTES);
}

/** Returns 20 most recent notes not tagged with a "book" type source. */
export async function getNonBookNotes() {
  const GET_NON_BOOK_NOTES = groq`*[_type == "note" && source->type != "book"] | order(_createdAt desc)[0...20] {
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
  return Sanity.fetch<Note[]>(GET_NON_BOOK_NOTES);
}

/** Returns either the note's explicit title, the implicit title of its source, or `null`. */
export function getNoteTitle(note?: Note): string | null {
  return note?.title ?? note?.source?.title ?? null;
}
