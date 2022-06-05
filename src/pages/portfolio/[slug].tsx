import { PortableText } from "@portabletext/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { groq } from "next-sanity";
import Sanity, { Schema, srcFor } from "src/providers/sanity";
import Page from "src/components/page";
import Image from "next/image";

export interface ProjectPageProps {
  project: Schema.Project;
}

const ProjectPage: NextPage<ProjectPageProps> = (props) => {
  const { project } = props;
  return (
    <Page>
      <article>
        <h1>{project.title}</h1>
        <PortableText value={project.body} />
        {project.mainImage && (
          <Image
            width={400}
            height={300}
            layout='responsive'
            src={srcFor(project.mainImage).height(600).width(800).url()}
          />
        )}
      </article>
    </Page>
  );
};

export default ProjectPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const query = groq`*[_type == "project"]`;
  const projects = await Sanity.fetch<Schema.Project[]>(query);
  const paths = projects.map((project) => ({
    params: { slug: project.slug.current },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<ProjectPageProps> = async (
  context
) => {
  const { slug } = context.params;
  const query = groq`*[_type == "project" && slug.current == "${slug}"][0]`;
  const project = await Sanity.fetch<Schema.Project>(query);
  return {
    props: {
      project,
    },
    revalidate: 3600,
  };
};
