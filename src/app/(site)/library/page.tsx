import type { Metadata } from "next";
import cx from "classnames";
import Book from "src/components/source/book";
import getAllBooks from "src/data/getAllBooks";
import listStyles from "src/styles/list.module.css";
import libraryStyles from "src/styles/library.module.css";

export const metadata: Metadata = {
  title: "Library",
  description: "A collection of Allan's read books",
};

export default async function Library() {
  const books = await getAllBooks();
  return (
    <ul className={cx(listStyles.noStyle, libraryStyles.grid)}>
      {books.map((book) => {
        return (
          <li key={book._id}>
            {/* @ts-expect-error Server Component */}
            <Book {...book} link />
          </li>
        );
      })}
    </ul>
  );
}
