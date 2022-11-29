import Image from "next/image";
import React from "react";
import getHomepage from "src/data/getHomepage";
import { srcFor } from "src/providers/sanity";
import styles from "./reading.module.css";

export const revalidate = 43200;

export interface BookProps {
  title: string;
  subtitle?: string;
  author?: string;
  imageUrl: string;
}

function Book(props: BookProps) {
  const { title, subtitle, author, imageUrl } = props;
  return (
    <div className={styles.book}>
      <figure className={styles.bookCover}>
        {imageUrl && (
          <Image
            alt={`The cover of the book ${title}`}
            src={srcFor(imageUrl).width(200).height(300).crop("center").url()}
            width={50}
            height={75}
          />
        )}
      </figure>
      <div className={styles.bookDetails}>
        <p className={styles.bookTitle}>{title}</p>
        {subtitle && <p className={styles.bookSubtitle}>{subtitle}</p>}
        {author && <p className={styles.bookAuthor}>{author}</p>}
      </div>
    </div>
  );
}

export default async function Status({
  children,
}: React.PropsWithChildren<{}>) {
  const { reading, read } = await getHomepage();
  return (
    <div className={styles.grid}>
      {reading && (
        <div className={styles.section}>
          <header>Currently Reading</header>
          {reading.map((book) => (
            <Book key={book._id} {...book} />
          ))}
        </div>
      )}
      {read && (
        <div className={styles.section}>
          <header>Recently Read</header>
          {read.map((book) => (
            <Book key={book._id} {...book} />
          ))}
        </div>
      )}
    </div>
  );
}
