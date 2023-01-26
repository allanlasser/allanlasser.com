import Link from "next/link";
import Book from "src/components/source/book";
import getAllBooks from "src/data/getAllBooks";
import listStyles from "src/styles/list.module.css";

export default async function Library() {
  const books = await getAllBooks();
  return (
    <ul
      className={listStyles.noStyle}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
        gap: "0 1em",
      }}
    >
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
