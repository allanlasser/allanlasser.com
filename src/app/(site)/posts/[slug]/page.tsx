import { Metadata } from "next";
import Post from "src/components/post";
import getPost from "src/data/getPost";
import getPublishedPosts from "src/data/getPublishedPosts";

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  return <Post post={post} />;
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug);
  return {
    title: post.title,
  };
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug.current }));
}

export const revalidate = 3600;
