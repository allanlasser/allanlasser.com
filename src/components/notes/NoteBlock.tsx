import { Note } from "src/types/note";
import typography from "src/styles/typography.module.css";
import cx from "classnames";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import smartquotes from "smartquotes";
import { LinkIcon } from "lucide-react";
import styles from "./NoteBlock.module.css";
import intersperse from "src/utils/intersperse";
import { ReactNode } from "react";

export default function NoteBlock({ note }: { note: Note }) {
  const citation = {
    author: note.source?.author && <span>{note.source.author}</span>,
    title: note.source?.title && (
      <Link
        href={note.source.url ?? `/shelf/${note.source._id}`}
        className={cx(typography.mediumWeight)}
      >
        {note.source.title}
      </Link>
    ),
    page: note.page && (
      <span
        className={cx(
          typography.smallSize,
          typography.mediumWeight,
          typography.noUnderline
        )}
      >
        pg. {note.page}
      </span>
    ),
  };
  return (
    <figure className={cx(styles.noteBlock)}>
      <div className={cx(typography.bodyText)}>
        <ReactMarkdown>{smartquotes(note.body)}</ReactMarkdown>
      </div>
      <figcaption className={cx(styles.figCaption, typography.smallSize)}>
        <cite>
          {intersperse<ReactNode>(
            Object.values(citation).filter((component) => Boolean(component)),
            ", "
          )}
        </cite>
        <Link
          rel='bookmark'
          href={`/notes/${note._id}`}
          className={cx(styles.permalink, typography.noUnderline)}
        >
          <LinkIcon size={14} strokeWidth={1.5} />
        </Link>
      </figcaption>
    </figure>
  );
}
