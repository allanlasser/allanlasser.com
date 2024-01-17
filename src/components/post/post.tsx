import type { Post } from "src/types/post";
import BlockContent from "src/components/block-content";
import typography from "src/styles/typography.module.css";
import styles from "./post.module.css";
import Link from "next/link";
import cx from "classnames";
import Title from "../title";

export default function Post({ post, link }: { post: Post; link?: boolean }) {
  const publishedAt = post.publishedAt ? new Date(post.publishedAt) : undefined;
  const title = post.title ?? post.source?.title;
  const permalink = `/posts/${post.slug.current}`;
  const postLink = post.source?.url ? post.source.url : permalink;
  const timestamp = publishedAt ? (
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
  ) : (
    <span className={styles.publishedAt}>Draft</span>
  );

  const titleComponent = title ? (
    <h1 className={styles.title}>
      <Title title={post.title ?? null} source={post.source ?? null} />
    </h1>
  ) : null;

  return (
    <article className={cx(styles.container)} id={post.slug.current}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          {link ? (
            <Link
              href={`/posts/${post.slug.current}`}
              rel='bookmark'
              className={styles.headerLink}
            >
              {timestamp}
            </Link>
          ) : (
            timestamp
          )}
        </div>
        {title &&
          (link ? (
            <Link
              href={postLink}
              rel={postLink === permalink ? "bookmark" : "external"}
              className={styles.title}
            >
              {titleComponent}
            </Link>
          ) : (
            titleComponent
          ))}
      </header>
      <main className={typography.bodyText}>
        <BlockContent value={post.body} />
      </main>
    </article>
  );
}
