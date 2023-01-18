import Image from "next/image";
import { srcFor } from "src/providers/sanity";
import styles from "./book.module.css";

export interface BookProps {
  title: string;
  subtitle?: string;
  author?: string;
  imageUrl?: string;
  isbn?: string;
  url?: string;
  large?: boolean;
}

export default function Book(props: BookProps) {
  const { title, subtitle, author, imageUrl, isbn, large } = props;
  const imageSize = large ? [200, 300] : [50, 75];
  return (
    <div className={styles.book}>
      {imageUrl && (
        <figure className={styles.bookCover}>
          {imageUrl && (
            <Image
              alt={`The cover of the book ${title}`}
              src={srcFor(imageUrl)
                .width(imageSize[0] * 2)
                .height(imageSize[1] * 2)
                .crop("center")
                .url()}
              width={imageSize[0]}
              height={imageSize[1]}
            />
          )}
        </figure>
      )}
      <div className={styles.bookDetails}>
        <p className={styles.bookTitle}>{title}</p>
        {subtitle && <p className={styles.bookSubtitle}>{subtitle}</p>}
        {author && <p className={styles.bookAuthor}>{author}</p>}
        <dl className={styles.bookMeta}>
          {isbn && (
            <>
              <dt>ISBN</dt>
              <dd className={styles.bookIsbn}>{isbn}</dd>
            </>
          )}
        </dl>
      </div>
    </div>
  );
}

export interface LargeBookProps extends BookProps {
  isbn?: string;
  url?: string;
}

export function LargeBook(props: LargeBookProps) {
  return (
    <div className={styles.largeBook}>
      <Book {...props} large />
    </div>
  );
}
