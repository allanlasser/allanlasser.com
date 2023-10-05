import { groq } from "next-sanity";
import Sanity from "src/providers/sanity";
import * as Schema from "src/providers/sanity/schema";

const GET_RESUME = groq`*[_type == "resume" && _id == "resume"][0]{
  history[] {
    role,
    description,
    startDate,
    endDate,
    company -> {
      name
    }
  },
  skills
}`;

export default async function getResume() {
  return Sanity.fetch<Schema.Resume>(GET_RESUME);
}
