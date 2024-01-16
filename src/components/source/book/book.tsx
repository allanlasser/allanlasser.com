import Image from "next/image";
import Link from "next/link";
import cx from "classnames";
import { getBookData } from "src/providers/openLibrary";
import { srcFor } from "src/providers/sanity";
import styles from "./book.module.css";

export interface BookProps {
  _id: string;
  title: string | null;
  subtitle?: string | null;
  author?: string | null;
  imageUrl?: string | null;
  isbn?: string | null;
  url?: string | null;
  size?: "small" | "medium" | "large";
  link?: boolean;
}

export default async function Book(props: BookProps) {
  const {
    _id,
    title,
    subtitle,
    author,
    imageUrl,
    isbn,
    size = "small",
    link,
  } = props;
  const imageSize = {
    large: [250, 375],
    medium: [100, 150],
    small: [50, 75],
  };
  const bookData =
    isbn && size === "large" ? await getBookData(isbn) : undefined;
  const bookComponent = (
    <div className={cx(styles.book, styles[size])}>
      {imageUrl && (
        <figure className={styles.bookCover}>
          {imageUrl && (
            <img
              alt={`The cover of the book ${title}`}
              src={
                srcFor(imageUrl)
                  .width(imageSize[size][0] * 2)
                  .height(imageSize[size][1] * 2)
                  .crop("center")
                  .url() ?? ""
              }
              style={{ objectFit: "contain" }}
            />
          )}
        </figure>
      )}
      <div className={styles.bookDetails}>
        <p className={styles.bookTitle}>{title}</p>
        {subtitle && <p className={styles.bookSubtitle}>{subtitle}</p>}
        {author && <p className={styles.bookAuthor}>{author}</p>}
        <dl className={styles.bookMeta}>
          {bookData?.publishers && (
            <>
              <dt>
                {bookData.publishers.length > 1 ? "Publishers" : "Publisher"}
              </dt>
              <dd>{bookData.publishers.join(", ")}</dd>
            </>
          )}
          {bookData?.publish_date && (
            <>
              <dt>Published</dt>
              <dd>{bookData.publish_date}</dd>
            </>
          )}
          {bookData?.number_of_pages && (
            <>
              <dt>Pages</dt>
              <dd>{bookData.number_of_pages}</dd>
            </>
          )}
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
  return link ? (
    <Link href={`/shelf/${_id}`} className={styles.bookLink}>
      {bookComponent}
    </Link>
  ) : (
    bookComponent
  );
}
