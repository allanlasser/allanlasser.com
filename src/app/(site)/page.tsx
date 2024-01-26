import cx from "classnames";
import { getHomepage } from "src/data/getHomepage";
import Post from "src/components/post";
import Reading from "src/components/reading";
import Search from "src/components/search";
import list from "src/styles/list.module.css";
import layout from "src/styles/layout.module.css";
import typography from "src/styles/typography.module.css";
import { getAllPosts, getPublishedPosts } from "src/data/getPosts";
import Subscribe from "src/components/subscribe";
import styles from "./page.module.css";
import ReactMarkdown from "react-markdown";
import smartquotes from "smartquotes";

export default async function HomePage({ searchParams }) {
  const { bio, reading, read } = await getHomepage();
  const isDev = process.env.NODE_ENV === "development";
  const posts = isDev ? await getAllPosts() : await getPublishedPosts();
  return (
    <div className={styles.homepage}>
      <aside className={styles.aside}>
        <div className={styles.asideTop}>
          <div className={styles.search}>
            <Search query={searchParams.query} floatResults />
          </div>
          <div className={styles.reading}>
            <Reading reading={reading} read={read} />
          </div>
        </div>
        <div className={styles.asideBottom}>
          <Subscribe />
        </div>
      </aside>
      <main className={styles.main}>
        {bio && (
          <section className={cx(styles.bio)}>
            <ReactMarkdown className={typography.bodyText}>
              {smartquotes(bio)}
            </ReactMarkdown>
          </section>
        )}
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
