import { groq } from "next-sanity";
import Sanity from "src/providers/sanity";
import { Post } from "src/types/post";

const GET_PUBLISHED_POSTS = groq`*[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  publishedAt,
  title,
  slug,
  body
}
`;

export default async function getAllPosts() {
  return Sanity.fetch<Post[]>(GET_PUBLISHED_POSTS);
}
