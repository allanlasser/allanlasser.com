import { groq } from "next-sanity";
import Sanity, { Schema } from "src/providers/sanity";

const GET_RESUME = groq`*[_type == "resume" && _id == "resume"][0]`;

export default async function getResume() {
  return Sanity.fetch<Schema.Resume>(GET_RESUME);
}
