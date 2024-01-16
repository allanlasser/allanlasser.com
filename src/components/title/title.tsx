import {
  Book,
  File,
  FileText,
  FileVideo,
  Link as LinkIcon,
  LucideIcon,
  Podcast,
} from "lucide-react";
import cx from "classnames";
import { Source } from "src/types/source";
import smartquotes from "smartquotes";
import styles from "./title.module.css";

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

export default function Title(props: {
  title: string | null;
  source: Source | null;
  page?: string | null;
}) {
  const title = props.title ?? props.source?.title;
  let Icon: LucideIcon | null;
  let url: URL | null;
  let type: keyof typeof SourceTypeIcons | null;
  if (props.source) {
    url = props.source?.url ? new URL(props.source.url) : null;
    type = props.source?.type;
    Icon = type ? SourceTypeIcons[type] : null;
    return url ? (
      <a
        href={url.href}
        rel='external'
        className={cx(styles.title, styles.source)}
      >
        {Icon && (
          <span
            className={styles.icon}
            title={type ? SourceTypeLabel[type] : ""}
          >
            <Icon size={24} />
          </span>
        )}
        <span>{smartquotes(title)}</span>
      </a>
    ) : (
      <span className={cx(styles.title, styles.source)}>
        {Icon && (
          <span
            className={styles.icon}
            title={type ? SourceTypeLabel[type] : ""}
          >
            <Icon size={24} />
          </span>
        )}
        <span>{smartquotes(title)}</span>
      </span>
    );
  }
  return (
    <span className={cx(styles.title, styles.standalone)}>
      {smartquotes(title)}
    </span>
  );
}
