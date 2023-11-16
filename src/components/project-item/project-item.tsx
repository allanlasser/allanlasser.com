import Image from "next/image";
import Company from "src/components/company";
import { srcFor } from "src/providers/sanity";
import type { Project } from "src/types/project";
import styles from "./project-item.module.css";

export default function ProjectItem({ project }: { project: Project }) {
  return (
    <div className={styles.projectItem}>
      {project.company && <Company company={project.company} />}
      <figure className={styles.projectImage}>
        {project.mainImage && (
          <Image
            alt=''
            src={srcFor(project.mainImage).height(600).width(600).url() ?? ""}
            fill
            sizes='100vw'
          />
        )}
      </figure>
      <h2 className={styles.projectTitle}>{project.title}</h2>
      <p className={styles.projectDescription}>{project.description}</p>
    </div>
  );
}
