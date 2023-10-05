import { Note } from "src/types/note";

export default function getNoteTitle(note: Note) {
  return note.title ?? note.source?.title ?? "Untitled";
}
