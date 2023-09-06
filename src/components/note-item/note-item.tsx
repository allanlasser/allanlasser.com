import cx from "classnames";
import ReactMarkdown from "react-markdown";
import { Note } from "src/types/note";
import { Source } from "src/types/source";
import styles from "./note-item.module.css";
import typography from "src/styles/typography.module.css";
import {
  Book,
  File,
  FileText,
  FileVideo,
  Link as LinkIcon,
  Podcast,
} from "lucide-react";
import Link from "next/link";
import smartquotes from "smartquotes";

const SourceTypeIcons = {
  book: Book,
  article: FileText,
  video: FileVideo,
  podcast: Podcast,
};

const SourceTypeLabel = {
  book: "Book",
  article: "Article",
  video: "Video",
};

function NoteSource({
  source,
  page,
}: {
  source: Source;
  page?: string | null;
}) {
  const Icon = SourceTypeIcons[source.type] ?? File;
  const smartTitle = smartquotes(source.title);
  const url = source.url ? new URL(source.url) : null;
  const title = source.url ? (
    <a href={source.url} rel='external' className={styles.sourceTitle}>
      <span
        className={styles.sourceType}
        title={SourceTypeLabel[source.type] ?? "Link"}
      >
        <Icon size={24} />
      </span>
      <span>{smartTitle}</span>
    </a>
  ) : (
    <span className={styles.sourceTitle}>
      <span
        className={styles.sourceType}
        title={SourceTypeLabel[source.type] ?? "Link"}
      >
        <Icon size={24} />
      </span>
      <span>{smartTitle}</span>
    </span>
  );
  return (
    <figure className={styles.source}>
      <h2>{title}</h2>
      {url && (
        <a
          className={cx(
            typography.smallSize,
            typography.mediumWeight,
            typography.noUnderline,
            typography.dim
          )}
          href={url.origin}
        >
          {url.hostname.replace("www.", "")}
        </a>
      )}
    </figure>
  );
}

export default function NoteItem({
  note,
  omitSource,
}: {
  note: Note;
  omitSource?: boolean;
}) {
  const date = new Date(note._createdAt);
  return (
    <section id={note._id} className={styles.note}>
      {!omitSource && note.source && (
        <header className={cx(styles.header)}>
          <NoteSource source={note.source} page={note.page} />
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
