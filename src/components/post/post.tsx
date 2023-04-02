import type { Post } from "src/types/post";
import BlockContent from "src/components/block-content";
import typography from "src/styles/typography.module.css";
import styles from "./post.module.css";
import Link from "next/link";

export default function Post({ post, link }: { post: Post, link?: boolean }) {
  const publishedAt = new Date(post.publishedAt);
  const header = (
    <header className={styles.header}>
      <hr className={styles.divider} />
      {post.publishedAt && <time
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
      </time>}
      <h1 className={styles.title}>{post.title}</h1>
    </header>
  )
  return (
    <article className={styles.container} id={post.slug.current}>
      {link ? <Link href={`/posts/${post.slug.current}`} className={styles.headerLink}>{header}</Link> : header}
      <main className={typography.bodyText}>
        <BlockContent value={post.body} />
      </main>
    </article>
  );
}
