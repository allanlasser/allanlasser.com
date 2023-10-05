import cx from "classnames";
import type { Metadata } from "next";
import Link from "next/link";
import { srcFor } from "src/providers/sanity";
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
        <h1 className={cx(typography.title)}>{project.title}</h1>
        <p className={cx(typography.title, typography.smallSize)}></p>
        {project.link && (
          <Link href={project.link} className={typography.data}>
            {project.link}
          </Link>
        )}
      </header>
      <main className={cx(typography.bodyText, projectStyles.body)}>
        {project.body && <BlockContent value={project.body} />}
      </main>
    </article>
  );
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug?.current }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const project = await getProject(params.slug);
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      images: project.mainImage
        ? [
            {
              url: srcFor(project.mainImage).height(600).width(600).url() ?? "",
              height: 600,
              width: 600,
            },
          ]
        : [],
    },
  };
}

export const revalidate = 3600;
