import cx from "classnames";
import { getHomepage, getNotesAndPosts } from "src/data/getHomepage";
import NoteItem from "src/components/note-item";
import PostItem from "src/components/post";
import Reading from "src/components/reading";
import Search from "src/components/search";
import list from "src/styles/list.module.css";
import layout from "src/styles/layout.module.css";
import styles from "./page.module.css";

export default async function HomePage({ searchParams }) {
  const { reading, read } = await getHomepage();
  const notesAndPosts = await getNotesAndPosts();
  return (
    <div className={styles.homepage}>
      <aside className={styles.aside}>
        <Search query={searchParams.query} floatResults />
        <Reading reading={reading} read={read} />
      </aside>
      <main className={styles.main}>
        <ul className={cx(layout.fullWidth, list.noStyle)}>
          {notesAndPosts.map((item) => {
            const component =
              item._type === "note" ? (
                <NoteItem note={item} />
              ) : (
                <PostItem post={item} link />
              );
            return (
              <li
                key={item._id}
                className={cx(list.listItem, {
                  [list.card]: item._type === "note",
                })}
              >
                {component}
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export const revalidate = 30;
