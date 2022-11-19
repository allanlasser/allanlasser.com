import getAllNotes from "src/data/getAllNotes";
import NoteList from "src/components/note-list/note-list";

export default async function HomePage({ children }) {
  const notes = await getAllNotes();
  return (
    <>
      <h1>Notes</h1>
      <NoteList notes={notes} />
    </>
  );
}
