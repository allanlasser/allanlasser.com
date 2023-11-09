import Link from "next/link";
import type { Project } from "src/types/project";
import ProjectItem from "../project-item";
import styles from "./project-list.module.css";
import React from "react";

export interface ProjectListProps {
  year: string;
  projects: Project[];
}

function groupProjectsByYear(projects: Project[]): Record<string, Project[]> {
  return projects.reduce((projectsByYear, project) => {
    const { year } = project;
    return {
      ...projectsByYear,
      [year]: [...(projectsByYear[year] ?? []), project],
    };
  }, {});
}

function ProjectList({ year, projects }: ProjectListProps) {
  return (
    <section className={styles.container}>
      <header className={styles.yearHeader}>
        {year}
        <hr />
      </header>
      <ul className={styles.projectList}>
        {projects.map((project) => (
          <li key={project.slug?.current} className={styles.projectListItem}>
            <Link
              href={`/portfolio/${project.slug?.current}`}
              className={styles.projectLink}
            >
              <ProjectItem project={project} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  const projectsByYear = groupProjectsByYear(projects);
  const years = Object.keys(projectsByYear).sort().reverse();
  return (
    <div className={styles.container}>
      {years.map((year) => (
        <ProjectList key={year} year={year} projects={projectsByYear[year]} />
      ))}
    </div>
  );
}
