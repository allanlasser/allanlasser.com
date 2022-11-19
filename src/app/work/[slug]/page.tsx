import cx from "classnames";
import Link from "next/link";
import typography from "src/styles/typography.module.css";
import projectStyles from "src/styles/project.module.css";
import BlockContent from "src/components/block-content";
import getProject from "src/data/getProject";
import getAllProjects from "src/data/getAllProjects";

export default async function PortfolioProject({ params }) {
  const project = await getProject(params.slug);
  return (
    <article>
      <header>
        {project.link && (
          <Link href={project.link} className={typography.data}>
            {project.link}
          </Link>
        )}
      </header>
      <main className={cx(typography.bodyText, projectStyles.body)}>
        <BlockContent value={project.body} />
      </main>
    </article>
  );
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug.current }));
}

export const revalidate = 3600;
