import getNote from "src/data/getNote";
import NoteItem from "src/components/note-item/note-item";
import getAllNotes from "src/data/getAllNotes";
import { Metadata } from "next";
import { srcFor } from "src/providers/sanity";
import { Note } from "src/types/note";

export default async function NotePage({ params }) {
  const note = await getNote(params.id);
  return <NoteItem note={note} />;
}

export async function generateStaticParams() {
  const notes = await getAllNotes();
  return notes.map((note) => ({ id: note._id }));
}

function getNoteTitle(note: Note) {
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

export async function generateMetadata({ params }): Promise<Metadata> {
  const note = await getNote(params.id);
  const title = getNoteTitle(note);
  return {
    title,
    openGraph: {
      images: note.source?.imageUrl
        ? [
            {
              url:
                srcFor(note.source.imageUrl)
                  .width(200)
                  .height(300)
                  .crop("center")
                  .fit("clip")
                  .url() ?? "",
              width: 200,
              height: 300,
            },
          ]
        : [],
    },
  };
}

export const revalidate = 3600;
