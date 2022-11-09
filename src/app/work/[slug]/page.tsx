import cx from "classnames";
import Link from "next/link";
import { groq } from "next-sanity";
import Sanity, { Schema } from "src/providers/sanity";
import typography from "src/styles/typography.module.css";
import projectStyles from "src/styles/project.module.css";
import BlockContent from "src/components/block-content";

export interface ProjectPageProps {
  project: Schema.Project;
}

export default async function PortfolioProject({ params }) {
  const { slug } = params;
  const PROJECT_QUERY = groq`*[_type == "project" && slug.current == "${slug}"][0]`;
  const project = await Sanity.fetch<Schema.Project>(PROJECT_QUERY);
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
  const query = groq`*[_type == "project"]`;
  const projects = await Sanity.fetch<Schema.Project[]>(query);
  return projects.map((project) => ({ slug: project.slug.current }));
}

// export const getStaticProps: GetStaticProps<ProjectPageProps> = async (
//   context
// ) => {
//   const { slug } = context.params;

//   return {
//     props: {
//       project,
//     },
//     revalidate: 3600,
//   };
// };
