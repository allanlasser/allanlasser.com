import { groq } from "next-sanity";
import Sanity from "src/providers/sanity";
import * as Schema from "src/providers/sanity/schema";

const query = groq`*[_type == "project"]`;

export default async function getAllProjects() {
  return Sanity.fetch<Schema.Project[]>(query);
}
