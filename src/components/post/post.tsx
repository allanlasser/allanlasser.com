import type { Post } from "src/types/post";
import BlockContent from "src/components/block-content";
import typography from "src/styles/typography.module.css";
import styles from "./post.module.css";

export default function Post({ post }: { post: Post }) {
  const publishedAt = new Date(post.publishedAt);
  return (
    <article className={styles.container} id={post.slug.current}>
      <header className={styles.header}>
        <hr className={styles.divider} />
        <time
          dateTime={publishedAt.toISOString()}
          title={publishedAt.toISOString()}
          className={styles.publishedAt}
        >
          {publishedAt.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className={styles.title}>{post.title}</h1>
      </header>
      <main className={typography.bodyText}>
        <BlockContent value={post.body} />
      </main>
    </article>
  );
}
