import Image from "next/image";
import Link from "next/link";
import getBookData from "src/data/getBookData";
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
  large?: boolean;
  link?: boolean;
}

export default async function Book(props: BookProps) {
  const { _id, title, subtitle, author, imageUrl, isbn, large, link } = props;
  const imageSize = large ? [200, 300] : [50, 75];
  const bookData = isbn && large ? await getBookData(isbn) : undefined;
  const bookComponent = (
    <div className={styles.book}>
      {imageUrl && (
        <figure className={styles.bookCover}>
          {imageUrl && (
            <Image
              alt={`The cover of the book ${title}`}
              src={
                srcFor(imageUrl)
                  .width(imageSize[0] * 2)
                  .height(imageSize[1] * 2)
                  .crop("center")
                  .url() ?? ""
              }
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
          {bookData?.publishers && (
            <>
              <dt>
                {bookData.publishers.length > 1 ? "Publishers" : "Publisher"}
              </dt>
              <dd>{bookData.publishers.join(", ")}</dd>
            </>
          )}
          {bookData?.publishedOn && (
            <>
              <dt>Published</dt>
              <dd>{bookData.publishedOn}</dd>
            </>
          )}
          {bookData?.pageCount && (
            <>
              <dt>Pages</dt>
              <dd>{bookData.pageCount}</dd>
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
    <Link href={`/library/${_id}`} className={styles.bookLink}>
      {bookComponent}
    </Link>
  ) : (
    bookComponent
  );
}

export interface LargeBookProps extends BookProps {
  isbn?: string | null;
  url?: string | null;
}

export function LargeBook(props: LargeBookProps) {
  return (
    <div className={styles.largeBook}>
      {/* @ts-expect-error Server Component */}
      <Book {...props} large />
    </div>
  );
}
