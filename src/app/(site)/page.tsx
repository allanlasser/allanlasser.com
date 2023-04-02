import getNotesAndPosts from "src/data/getNotesAndPosts";
import NoteItem from "src/components/note-item";
import PostItem from "src/components/post";
import Reading from "src/components/reading";
import list from "src/styles/list.module.css";

export default async function HomePage() {
  const notesAndPosts = await getNotesAndPosts();

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
