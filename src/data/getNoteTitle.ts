import { Note } from "src/types/note";

export default function getNoteTitle(note: Note) {
  let title;
  if (note.source?.title) {
    title = note.source.title;
  } else {
    title = new Date(note._createdAt).toLocaleString([], {
      dateStyle: "long",
      timeStyle: "short",
    });
  }
  return `Note on ${title}`;
}
