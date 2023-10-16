import { groq } from "next-sanity";
import Sanity from "src/providers/sanity";
import blockContent from "./fragments/blockContent";
import type { Project } from "src/types/project";

export default async function getProject(slug: string) {
  const PROJECT_QUERY = groq`*[_type == "project" && slug.current == $slug][0] {
    title,
    description,
    year,
    link,
    mainImage,
    company -> {
      name,
      "logo": logo.asset -> {
        url,
        title,
        altText,
        "palette": metadata.palette,
        "dimensions": metadata.dimensions
      }
    },
    role,
    body[] { ${blockContent} }
  }`;
  return await Sanity.fetch<Project>(PROJECT_QUERY, { slug });
}
