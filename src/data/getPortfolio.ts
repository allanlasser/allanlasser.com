import { groq } from "next-sanity";
import Sanity from "src/providers/sanity";
import * as Schema from "src/providers/sanity/schema";

const PORTFOLIO_QUERY = groq`*[_type == "portfolio" && _id == "portfolio"][0]{
  personalStatement,
  projects[]->
}`;

export default async function getPortfolio() {
  return Sanity.fetch<{
    projects: Schema.Project[];
    personalStatement: Schema.BlockContent;
  }>(PORTFOLIO_QUERY);
}
