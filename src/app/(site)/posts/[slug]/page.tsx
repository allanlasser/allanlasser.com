import { Metadata } from "next";
import cx from "classnames";
import Post from "src/components/post";
import Subscribe from "src/components/subscribe";
import getPost from "src/data/getPost";
import { getPublishedPosts } from "src/data/getPosts";
import layout from "src/styles/layout.module.css";
import styles from "./page.module.css";

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  return (
    <div className={layout.detail}>
      <Post post={post} />
      <aside className={cx(styles.subscribe, layout.card)}>
        <header>
          <h2>Thanks for stopping by!</h2>
          <p>If you enjoyed this, consider joining my newsletter.</p>
        </header>
        <Subscribe />
      </aside>
    </div>
  );
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug);
  return {
    title: post.title,
  };
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts
    .map((post) => ({ slug: post.slug?.current }))
    .filter(({ slug }) => Boolean(slug));
}

export const revalidate = 3600;
