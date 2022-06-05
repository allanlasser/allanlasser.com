import { GetStaticProps, NextPage } from "next";
import { groq } from "next-sanity";
import Sanity, { Schema } from "src/providers/sanity";
import Page from "src/components/page";
import Link from "next/link";

export interface ResumePageProps {
  projects: Schema.Project[];
}

const ResumePage: NextPage<ResumePageProps> = (props) => {
  const { projects } = props;
  return (
    <Page>
      <article>
        <h1>Portfolio</h1>
        {projects.map((project) => (
          <Link
            key={project.slug.current}
            href={`/portfolio/${project.slug.current}`}
          >
            <a>
              <h2
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                {project.title}
              </h2>
            </a>
          </Link>
        ))}
      </article>
    </Page>
  );
};

export default ResumePage;

export const getStaticProps: GetStaticProps<ResumePageProps> = async () => {
  const query = groq`*[_type == "project"]`;
  const projects = await Sanity.fetch<Schema.Project[]>(query);
  return {
    props: {
      projects,
    },
    revalidate: 3600,
  };
};
