import { GetStaticProps, NextPage } from "next";
import { groq } from "next-sanity";
import Sanity, { Schema } from "src/providers/sanity";
import Page from "src/components/page";
import styles from "src/styles/portfolio.module.css";
import Link from "next/link";

export interface PortfolioPageProps {
  projects: Schema.Project[];
}

const PortfolioPage: NextPage<PortfolioPageProps> = (props) => {
  const { projects } = props;
  return (
    <Page>
      <article>
        <h1>Portfolio</h1>
        <ul className={styles.projectList}>
          {projects.map((project) => (
            <li key={project.slug.current}>
              <Link href={`/portfolio/${project.slug.current}`}>
                <a className={styles.projectLink}>
                  <h2>{project.title}</h2>
                </a>
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
    projects[]->
  }`;
  const portfolio = await Sanity.fetch<{ projects: Schema.Project[] }>(query);
  const { projects } = portfolio;
  return {
    props: {
      projects,
    },
    revalidate: 3600,
  };
};
