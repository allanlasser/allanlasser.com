import { Source } from "src/types/source";
import Book from "src/components/source/book";
import styles from "./reading.module.css";

export const revalidate = 43200;

export default function Status({
  reading,
  read,
}: React.PropsWithChildren<{ reading: Source[]; read: Source[] }>) {
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
