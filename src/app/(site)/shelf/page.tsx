import type { Metadata } from "next";
import cx from "classnames";
import Book from "src/components/source/book";
import { getAllBooks } from "src/data/source";
import listStyles from "src/styles/list.module.css";
import layout from "src/styles/layout.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Shelf",
  description: "Collected sources",
};

export default async function Library() {
  const books = await getAllBooks();
  return (
    <ul className={cx(layout.fullWidth, listStyles.noStyle, styles.grid)}>
      {books.map((book) => {
        return (
          <li key={book._id}>
            <Book {...book} link size='medium' />
          </li>
        );
      })}
    </ul>
  );
}
