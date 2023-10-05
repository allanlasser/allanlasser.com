import Image from "next/image";
import * as Schema from "src/providers/sanity/schema";
import { srcFor } from "src/providers/sanity";
import styles from "./project-item.module.css";

export default function ProjectItem({ project }: { project: Schema.Project }) {
  return (
    <div className={styles.projectItem}>
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
