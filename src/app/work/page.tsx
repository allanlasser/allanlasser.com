import { groq } from "next-sanity";
import Sanity, { Schema } from "src/providers/sanity";

import BlockContent from "src/components/block-content";
import ProjectList from "src/components/project-list";
import typography from "src/styles/typography.module.css";

export interface PortfolioPageProps {
  projects: Schema.Project[];
  personalStatement: Schema.BlockContent;
}

const PORTFOLIO_QUERY = groq`*[_type == "portfolio" && _id == "portfolio"][0]{
  personalStatement,
  projects[]->
}`;

export default async function PortfolioRoot({ children }) {
  const { projects, personalStatement } = await Sanity.fetch<{
    projects: Schema.Project[];
    personalStatement: Schema.BlockContent;
  }>(PORTFOLIO_QUERY);
  return (
    <article>
      <ProjectList projects={projects} />
      <div className={typography.bodyText}>
        <BlockContent value={personalStatement} />
      </div>
    </article>
  );
}
