import { groq } from "next-sanity";
import Sanity from "src/providers/sanity";
import { Post } from "src/types/post";

const GET_ALL_POSTS = groq`*[_type == "post"] | order(_createdAt desc) {
  _id,
  _createdAt,
  _updatedAt,
  publishedAt,
  title,
  slug,
  body
}
`;

export default async function getAllPosts() {
  return Sanity.fetch<Post[]>(GET_ALL_POSTS);
}
