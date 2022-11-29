import { groq } from "next-sanity";
import Sanity from "src/providers/sanity";

const GET_HOMEPAGE = groq`*[_type == "homepage" && _id == "homepage"][0] {
  reading[]->{
    _id,
    title,
    subtitle,
    author,
    "imageUrl": cover.asset->url
  },
  read[]->{
    _id,
    title,
    subtitle,
    author,
    "imageUrl": cover.asset->url
  }
}`;

export default async function getHomepage() {
  return Sanity.fetch(GET_HOMEPAGE);
}
