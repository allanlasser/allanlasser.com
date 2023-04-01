import getAllNotes from "src/data/getAllNotes";
import NoteList from "src/components/note-list/note-list";
import Reading from "src/components/reading";

export default async function HomePage() {
  const notes = await getAllNotes();
  return (
    <>
      {/** @ts-expect-error Server Component */}
      <Reading />
      <h1 style={{ fontSize: "1.6rem" }}>Notes &amp; Highlights</h1>
      <NoteList notes={notes} />
    </>
  );
}

export const revalidate = 30;
