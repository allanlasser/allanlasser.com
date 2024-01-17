import cx from "classnames";
import ReactMarkdown from "react-markdown";
import { Note } from "src/types/note";
import styles from "./note-item.module.css";
import typography from "src/styles/typography.module.css";
import Link from "next/link";
import smartquotes from "smartquotes";
import { getNoteTitle } from "src/data/note";
import Title from "../title";
import { LinkIcon } from "lucide-react";

export default function NoteItem({
  note,
  omitSource,
}: {
  note: Note;
  omitSource?: boolean;
}) {
  const title = getNoteTitle(note);
  const date = new Date(note._createdAt);
  const showHeader = !omitSource && (note.source?.title || note.title);
  const sourceLink = note.source
    ? note.source.url ?? `/shelf/${note.source._id}`
    : null;
  const sourceLinkRel = note.source?.url ? "bookmark" : "";
  const titleComponent = (
    <h2>
      <Title title={title} source={note.source} />
    </h2>
  );
  return (
    <section id={note._id} className={styles.note}>
      {showHeader && (
        <header className={cx(styles.header)}>
          {sourceLink ? (
            <Link href={sourceLink} rel={sourceLinkRel}>
              {titleComponent}
            </Link>
          ) : (
            titleComponent
          )}
        </header>
      )}
      <main className={cx(styles.main, typography.bodyText)}>
        <ReactMarkdown>{smartquotes(note.body)}</ReactMarkdown>
      </main>
      <footer className={styles.footer}>
        <Link
          rel='bookmark'
          href={`/notes/${note._id}`}
          className={cx(typography.noUnderline)}
        >
          <LinkIcon size={14} />
        </Link>
        {note.page && (
          <span
            className={cx(
              typography.smallSize,
              typography.mediumWeight,
              typography.noUnderline
            )}
          >
            pg. {note.page}
          </span>
        )}
        <time
          className={cx(styles.time)}
          dateTime={note._createdAt}
          title={note._createdAt}
        >
          {date.toLocaleDateString()}{" "}
          {date.toLocaleTimeString(undefined, {
            timeStyle: "short",
          })}
        </time>
      </footer>
    </section>
  );
}
