import Link from "next/link";
import cx from "classnames";
import { getBookData } from "src/providers/openLibrary";
import styles from "./book.module.css";
import Cover from "./cover";
import { ImagePalette } from "sanity";

export interface BookProps {
  _id: string;
  title: string | null;
  subtitle?: string | null;
  author?: string | null;
  imageUrl?: string | null;
  palette?: ImagePalette | null;
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
    palette,
    isbn,
    size = "small",
    link,
  } = props;

  const bookData =
    isbn && size === "large" ? await getBookData(isbn) : undefined;
  const bookComponent = (
    <div className={cx(styles.book, styles[size])}>
      {imageUrl && (
        <Cover url={imageUrl} size={size} title={title} colors={palette} />
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
