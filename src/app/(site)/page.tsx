import cx from "classnames";
import { getHomepage } from "src/data/getHomepage";
import Post from "src/components/post";
import Reading from "src/components/reading";
import Search from "src/components/search";
import list from "src/styles/list.module.css";
import layout from "src/styles/layout.module.css";
import styles from "./page.module.css";
import { getAllPosts, getPublishedPosts } from "src/data/getPosts";

export default async function HomePage({ searchParams }) {
  const { reading, read } = await getHomepage();
  const isDev = process.env.NODE_ENV === "development";
  const posts = isDev ? await getAllPosts() : await getPublishedPosts();
  return (
    <div className={styles.homepage}>
      <aside className={styles.aside}>
        <Search query={searchParams.query} floatResults />
        <Reading reading={reading} read={read} />
      </aside>
      <main className={styles.main}>
        <ul className={cx(layout.fullWidth, list.noStyle)}>
          {posts.map((item) => (
            <li key={item._id} className={cx(list.listItem)}>
              <Post post={item} link />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export const revalidate = 30;
