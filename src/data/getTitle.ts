import { groq } from "next-sanity";
import Sanity from "src/providers/sanity";

const GET_TITLE = groq`*[_type == "homepage" && _id == "homepage"][0]{ title }`;

export default async function getTitle() {
  const { title } = await Sanity.fetch(GET_TITLE);
  return title;
}
