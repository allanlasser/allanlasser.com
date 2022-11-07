import { GetStaticProps, NextPage } from "next";
import { groq } from "next-sanity";
import Sanity, { Schema, srcFor } from "src/providers/sanity";
import Image from "next/image";
import Page from "src/components/page";
import styles from "src/styles/portfolio.module.css";
import Link from "next/link";
import BlockContent from "src/components/block-content";

export interface PortfolioPageProps {
  projects: Schema.Project[];
  personalStatement: Schema.BlockContent;
}

const PortfolioPage: NextPage<PortfolioPageProps> = (props) => {
  const { projects, personalStatement } = props;
  console.log(personalStatement);
  return (
    <Page title='Portfolio'>
      <article>
        <BlockContent value={personalStatement} />
        <ul className={styles.projectList}>
          {projects.map((project) => (
            <li key={project.slug.current} className={styles.projectItem}>
              <Link
                href={`/portfolio/${project.slug.current}`}
                className={styles.projectLink}
              >
                <figure className={styles.projectImage}>
                  {project.mainImage && (
                    <Image
                      alt=''
                      src={srcFor(project.mainImage)
                        .height(600)
                        .width(600)
                        .url()}
                      fill
                      sizes="100vw" />
                  )}
                </figure>
                <h2 className={styles.projectTitle}>{project.title}</h2>
                <p className={styles.projectDescription}>
                  {project.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </Page>
  );
};

export default PortfolioPage;

export const getStaticProps: GetStaticProps<PortfolioPageProps> = async () => {
  const query = groq`*[_type == "portfolio" && _id == "portfolio"][0]{
    personalStatement,
    projects[]->
  }`;
  const portfolio = await Sanity.fetch<{
    projects: Schema.Project[];
    personalStatement: Schema.BlockContent;
  }>(query);
  const { projects, personalStatement } = portfolio;
  return {
    props: {
      projects,
      personalStatement,
    },
    revalidate: 3600,
  };
};
