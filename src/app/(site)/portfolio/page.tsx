import type { Metadata } from "next";
import cx from "classnames";
import BlockContent from "src/components/block-content";
import Projects from "src/components/project-list";
import getPortfolio from "src/data/getPortfolio";
import layout from "src/styles/layout.module.css";
import typography from "src/styles/typography.module.css";

export const metadata: Metadata = {
  title: "Work",
  description: "Allan Lasser's Portfolio",
};

export default async function PortfolioRoot() {
  const { projects, personalStatement } = await getPortfolio();
  return (
    <article className={layout.detail}>
      <div className={cx(typography.bodyText)}>
        <BlockContent value={personalStatement} />
      </div>
      <Projects projects={projects} />
    </article>
  );
}
