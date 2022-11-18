import getNote from "src/data/getNote";
import NoteItem from "src/components/note-item/note-item";
import getAllNotes from "src/data/getAllNotes";

export default async function NotePage({ params }) {
  const note = await getNote(params.id);
  return <NoteItem {...note} />;
}

export async function generateStaticParams() {
  const notes = await getAllNotes();
  return notes.map((note) => ({ id: note._id }));
}

export const revalidate = 3600;
