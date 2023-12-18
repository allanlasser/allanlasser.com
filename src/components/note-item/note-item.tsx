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
  LucideIcon,
  Podcast,
} from "lucide-react";
import Link from "next/link";
import smartquotes from "smartquotes";
import { getNoteTitle } from "src/data/note";

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

function NoteTitle({
  title,
  source,
  page,
}: {
  title: string | null;
  source: Source | null;
  page?: string | null;
}) {
  let Icon: LucideIcon | null = null;
  let type: string = "article";
  let smartTitle = smartquotes(title);
  let url: URL | null = null;
  if (source) {
    type = source.type;
    Icon = SourceTypeIcons[type];
    url = source.url ? new URL(source.url) : null;
  }
  const titleElement = url ? (
    <a href={url.href} rel='external' className={styles.sourceTitle}>
      {Icon && (
        <span className={styles.sourceType} title={SourceTypeLabel[type]}>
          <Icon size={24} />
        </span>
      )}
      <span>{smartTitle}</span>
    </a>
  ) : (
    <span className={styles.sourceTitle}>
      {Icon && (
        <span className={styles.sourceType} title={SourceTypeLabel[type]}>
          <Icon size={24} />
        </span>
      )}
      <span>{smartTitle}</span>
    </span>
  );
  return (
    <figure className={styles.source}>
      <h2>{titleElement}</h2>
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
  const title = getNoteTitle(note);
  const date = new Date(note._createdAt);
  const showHeader = !omitSource && (note.source || note.title !== "Untitled");
  return (
    <section id={note._id} className={styles.note}>
      {showHeader && (
        <header className={cx(styles.header)}>
          <NoteTitle title={title} source={note.source} page={note.page} />
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
