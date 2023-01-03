import Link from "next/link";
import Book from "src/components/source/book";
import getAllBooks from "src/data/getAllBooks";
import listStyles from "src/styles/list.module.css";

export default async function Library() {
  const books = await getAllBooks();
  return (
    <ul className={listStyles.noStyle}>
      {books.map((book) => {
        return (
          <li key={book._id}>
            <Link href={`/library/${book._id}`}>
              <Book {...book} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
