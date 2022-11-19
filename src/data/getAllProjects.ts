import { groq } from "next-sanity";
import Sanity, { Schema } from "src/providers/sanity";

const query = groq`*[_type == "project"]`;

export default async function getAllProjects() {
  return Sanity.fetch<Schema.Project[]>(query);
}
