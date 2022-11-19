import BlockContent from "src/components/block-content";
import ProjectList from "src/components/project-list";
import getPortfolio from "src/data/getPortfolio";
import typography from "src/styles/typography.module.css";

export default async function PortfolioRoot({ children }) {
  const { projects, personalStatement } = await getPortfolio();
  return (
    <article>
      <ProjectList projects={projects} />
      <div className={typography.bodyText}>
        <BlockContent value={personalStatement} />
      </div>
    </article>
  );
}
