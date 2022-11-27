import { Source, SourceType } from "src/types/source";
import client from "src/providers/sanity";
import { Note } from "src/types/note";

export interface CreateNoteArgs {
  body: string;
  page?: number;
  source: {
    type: SourceType;
    title: string;
    url?: string;
    author?: string;
  };
}

export interface CreateNoteResponse {
  note: Note;
  source: Source;
}

export default async function createNote(args: CreateNoteArgs) {
  const source = await client.create({
    _type: "source",
    ...args.source,
  });
  const note = await client.create({
    _type: "note",
    body: args.body,
    page: args.page,
    source: source
      ? {
          _ref: source._id,
        }
      : undefined,
  });
  return { note, source };
}
