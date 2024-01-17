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
    body[] {
      (_type != 'note' || _type != 'album') => @,
      _type == 'note' => @->{
        _id,
        _type,
        title,
        body,
        page,
        source->
      },
      _type == 'album' => @->{
        _type,
        _id,
        title,
        images[] {
          asset,
          "_id": asset->_id,
          "title": asset->title,
          "alt": asset->altText,
          "src": asset->url
        }
      }
    },
    source -> {
      _id,
      title,
      url,
      type
    }
  }`;
  return await Sanity.fetch<Post>(GET_POST_QUERY);
}
