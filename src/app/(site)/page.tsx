import getAllNotes from "src/data/getAllNotes";
import NoteItem from "src/components/note-item";
import Reading from "src/components/reading";
import getPublishedPosts from "src/data/getPublishedPosts";
import list from "src/styles/list.module.css";
import { Note } from "src/types/note";
import { Post } from "src/types/post";
import PostItem from "src/components/post";
import { containsOrEqualsElement } from "@sanity/ui";

function getDateToCompare(item: Note | Post) {
  let date: Date;
  switch (item._type) {
    case "note":
      date = new Date(item._createdAt);
      break;
    case "post":
      date = new Date(item.publishedAt);
      break;
  }
  return date;
}

export default async function HomePage() {
  const notes = await getAllNotes();
  const posts = await getPublishedPosts();
  const notesAndPosts: Array<Note | Post> = [...notes, ...posts].sort((a, b) => {
    const aDate = getDateToCompare(a);
    const bDate = getDateToCompare(b);
    return bDate.getTime() - aDate.getTime()
  })

  return (
    <>
      {/** @ts-expect-error Server Component */}
      <Reading />
      <ul className={list.noStyle}>
      {notesAndPosts.map((item) => {
        const component = item._type === "note" ? <NoteItem note={item} /> : <PostItem post={item} link />;
        return (
          <li key={item._id} className={list.listItem}>
            {component}
          </li>
        );
      })}
    </ul>
    </>
  );
}

export const revalidate = 30;
