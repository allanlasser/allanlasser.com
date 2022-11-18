import getNotes from "src/data/getNotes";
import NoteList from "src/components/note-list/note-list";

export default async function HomePage({ children }) {
  const notes = await getNotes();
  return (
    <>
      <h1>Reading notes</h1>
      <NoteList notes={notes} />
    </>
  );
}

export const revalidate = 3600;
