import type { Metadata } from "next";
import BlockContent from "src/components/block-content";
import ProjectList from "src/components/project-list";
import getPortfolio from "src/data/getPortfolio";
import typography from "src/styles/typography.module.css";

export const metadata: Metadata = {
  title: "Work",
  description: "Allan Lasser's Portfolio",
};

export default async function PortfolioRoot() {
  const { projects, personalStatement } = await getPortfolio();
  return (
    <article>
      <div className={typography.bodyText}>
        <BlockContent value={personalStatement} />
      </div>
      <ProjectList projects={projects} />
    </article>
  );
}
