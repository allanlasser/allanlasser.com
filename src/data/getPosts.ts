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

export async function getPublishedPosts() {
  return Sanity.fetch<Post[]>(GET_PUBLISHED_POSTS);
}

const GET_ALL_POSTS = groq`*[_type == "post" && (_id in path("drafts.**") || !defined(*[_id == "drafts." + ^._id][0]))] | order(select(defined(publishedAt) => 1,  0) desc, publishedAt desc) {
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

export async function getAllPosts() {
  return Sanity.fetch<Post[]>(GET_ALL_POSTS);
}