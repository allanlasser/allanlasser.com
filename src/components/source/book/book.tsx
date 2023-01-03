import Image from "next/image";
import { srcFor } from "src/providers/sanity";
import styles from "./book.module.css";

export interface BookProps {
  title: string;
  subtitle?: string;
  author?: string;
  imageUrl?: string;
}

export default function Book(props: BookProps) {
  const { title, subtitle, author, imageUrl } = props;
  return (
    <div className={styles.book}>
      {imageUrl && (
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
      )}
      <div className={styles.bookDetails}>
        <p className={styles.bookTitle}>{title}</p>
        {subtitle && <p className={styles.bookSubtitle}>{subtitle}</p>}
        {author && <p className={styles.bookAuthor}>{author}</p>}
      </div>
    </div>
  );
}
