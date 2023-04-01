import type { Post } from "src/types/post";
import BlockContent from "src/components/block-content";
import typography from "src/styles/typography.module.css";

export default function Post({ post }: { post: Post }) {
  return (
    <article id={post.slug.current}>
      <header>
        <h1>{post.title}</h1>
        <time>{post.publishedAt}</time>
      </header>
      <main className={typography.bodyText}>
        <BlockContent value={post.body} />
      </main>
      <footer>
        <dl>
          <dt>Last Updated</dt>
          <dd>{post._updatedAt}</dd>
        </dl>
      </footer>
    </article>
  );
}
