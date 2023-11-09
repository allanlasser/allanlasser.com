import { groq } from "next-sanity";
import Sanity from "src/providers/sanity";
import type { Project } from "src/types/project";
import type { BlockContent } from "src/providers/sanity/schema";

const PORTFOLIO_QUERY = groq`*[_type == "portfolio" && _id == "portfolio"][0]{
  personalStatement,
  projects[]->{
    title,
    slug,
    description,
    year,
    link,
    mainImage,
    company -> {
      name,
      logo
    },
  }
}`;

export default async function getPortfolio() {
  return Sanity.fetch<{
    projects: Project[];
    personalStatement: BlockContent;
  }>(PORTFOLIO_QUERY);
}
