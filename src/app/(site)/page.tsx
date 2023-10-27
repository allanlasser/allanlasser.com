import { getHomepage, getNotesAndPosts } from "src/data/getHomepage";
import { type SearchResponse, search } from "src/data/search";
import NoteItem from "src/components/note-item";
import PostItem from "src/components/post";
import Reading from "src/components/reading";
import list from "src/styles/list.module.css";
import Search from "src/components/search";

export default async function HomePage() {
  const { reading, read } = await getHomepage();
  const notesAndPosts = await getNotesAndPosts();
  return (
    <>
      <Search floatResults />
      <Reading reading={reading} read={read} />
      <ul className={list.noStyle}>
        {notesAndPosts.map((item) => {
          const component =
            item._type === "note" ? (
              <NoteItem note={item} />
            ) : (
              <PostItem post={item} link />
            );
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
