import React from "react";
import Link from "next/link";
import getHomepage from "src/data/getHomepage";
import Book from "src/components/source/book";
import styles from "./reading.module.css";

export const revalidate = 43200;

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
            /* @ts-expect-error Server Component */
            <Book {...book} key={book._id} link />
          ))}
        </div>
      )}
      {read && (
        <div className={styles.section}>
          <header>Recently Read</header>
          {read.map((book) => (
            /* @ts-expect-error Server Component */
            <Book {...book} key={book._id} link />
          ))}
        </div>
      )}
    </div>
  );
}
