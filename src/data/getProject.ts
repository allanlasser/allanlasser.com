import { groq } from "next-sanity";
import Sanity, { Schema } from "src/providers/sanity";

export default async function getProject(slug: string) {
  const PROJECT_QUERY = groq`*[_type == "project" && slug.current == "${slug}"][0]`;
  return await Sanity.fetch<Schema.Project>(PROJECT_QUERY);
}
