import { Source, SourceType } from "src/types/source";
import client from "src/providers/sanity";
import { Note } from "src/types/note";
import createSource from "./createSource";

export interface CreateNoteArgs {
  title?: string;
  body: string;
  page?: number;
  source?: {
    type: SourceType;
    title: string;
    url?: string;
    author?: string;
  };
}

export interface CreateNoteResponse {
  note: Note;
  source: Source | null;
}

export default async function createNote(args: CreateNoteArgs) {
  const source = args.source ? await createSource(args.source) : null;
  const note = await client.create({
    _type: "note",
    title: args.title,
    body: args.body,
    page: args.page,
    source: source
      ? {
          _ref: source._id,
        }
      : null,
  });
  return { note, source };
}
