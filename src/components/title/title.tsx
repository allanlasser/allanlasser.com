import {
  Book,
  File,
  FileText,
  FileVideo,
  Link as LinkIcon,
  LucideIcon,
  Podcast,
  ExternalLink,
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

function Icon({ type }: { type?: string | null }) {
  let Icon: LucideIcon | null;
  Icon = type ? SourceTypeIcons[type] : null;
  if (!type || !Icon) return null;
  return (
    <span className={styles.icon} title={type ? SourceTypeLabel[type] : ""}>
      <Icon size={16} />
    </span>
  );
}

export default function Title(props: {
  title: string | null;
  source: Source | null;
  page?: string | null;
}) {
  const title = props.title ?? props.source?.title;
  if (!title) return null;
  return (
    <span
      className={cx(styles.title, { [styles.source]: Boolean(props.source) })}
    >
      {/* <Icon type={props.source?.type} /> */}
      <span>{smartquotes(title)}</span>
      {props.source?.url && (
        <span className={styles.icon}>
          <ExternalLink size={16} />
        </span>
      )}
    </span>
  );
}
