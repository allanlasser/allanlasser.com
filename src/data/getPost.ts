import { groq } from "next-sanity";
import Sanity from "src/providers/sanity";
import { Post } from "src/types/post";

export default async function getPost(slug: string) {
  const GET_POST_QUERY = groq`*[_type == "post" && slug.current == "${slug}"][0] {
    _id,
    _createdAt,
    _updatedAt,
    publishedAt,
    title,
    slug,
    layout,
    body[] {
      _type != 'reference' => @,
      _type == 'reference' => @->{
        _type != 'album' => @,
        _type == 'album' => {
          _type,
          _id,
          title,
          images[] {
            "_id": asset->_id,
            "title": asset->title,
            "alt": asset->altText,
            "src": asset->url
          }
        }
      }
    }
  }`;
  return await Sanity.fetch<Post>(GET_POST_QUERY);
}
