import NoteItem from "src/components/note-item/note-item";
import { getNote, getAllNotes, getNoteTitle } from "src/data/note";
import { Metadata } from "next";
import { srcFor } from "src/providers/sanity";

export default async function NotePage({ params }) {
  const note = await getNote(params.id);
  return <NoteItem note={note} />;
}

export async function generateStaticParams() {
  const notes = await getAllNotes();
  return notes.map((note) => ({ id: note._id }));
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
