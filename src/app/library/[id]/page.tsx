import getAllBooks from "src/data/getAllBooks";
import getSource from "src/data/getSource";
import getSourceNotes from "src/data/getSourceNotes";
import NoteList from "src/components/note-list";
import { LargeBook } from "src/components/source/book";
import orderNotesByPage from "src/utils/orderNotesByPage";
import { Metadata } from "next";
import { srcFor } from "src/providers/sanity";

export async function generateMetadata({ params }): Promise<Metadata> {
  const source = await getSource(params.id);
  return {
    title: source.title,
    openGraph: {
      images: source.imageUrl
        ? [
            {
              url:
                srcFor(source.imageUrl)
                  .width(200)
                  .height(300)
                  .crop("center")
                  .url() ?? "",
              width: 200,
              height: 300,
            },
          ]
        : [],
    },
  };
}

export default async function SourcePage({ params }) {
  const source = await getSource(params.id);
  const notes = await getSourceNotes(params.id);
  return (
    <div>
      <LargeBook {...source} />
      {notes.length > 0 && (
        <>
          <h1 style={{ fontSize: "1.4rem" }}>Notes &amp; Highlights</h1>
          <NoteList omitSource={true} notes={orderNotesByPage(notes)} />
        </>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const books = await getAllBooks();
  return books.map((book) => ({ id: book._id }));
}

export const revalidate = 3600;
