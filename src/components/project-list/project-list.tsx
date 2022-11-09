import Link from "next/link";
import { Schema } from "src/providers/sanity";
import ProjectItem from "../project-item";
import styles from "./project-list.module.css";

export interface ProjectListProps {
  projects: Schema.Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className={styles.container}>
      <ul className={styles.projectList}>
        {projects.map((project) => (
          <li key={project.slug.current} className={styles.projectListItem}>
            <Link
              href={`/work/${project.slug.current}`}
              className={styles.projectLink}
            >
              <ProjectItem project={project} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
