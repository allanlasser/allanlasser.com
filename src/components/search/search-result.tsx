import { MouseEvent } from "react";
import Link from "next/link";
import {
  Bookmark,
  Pencil,
  File,
  FileText,
  FileVideo,
  Book,
  Podcast,
  type LucideIcon,
} from "lucide-react";
import getPermalink from "src/utils/getPermalink";
import { type SearchResult } from "src/data/search";
import styles from "./search.module.css";

function getTypeIcon(type: string): LucideIcon {
  const iconMap = {
    post: Pencil,
    note: Bookmark,
    book: Book,
    podcast: Podcast,
    article: FileText,
    video: FileVideo,
  };
  return iconMap[type] ?? File;
}

interface SearchResultItemProps {
  result: SearchResult;
  onClick?: (event: MouseEvent) => void;
}

export default function SearchResultItem({
  result,
  onClick,
}: SearchResultItemProps) {
  const href = getPermalink(result);
  const page = result.page ? `pg. ${result.page}` : null;
  const url =
    result.url ?? result.source?.url
      ? new URL(result.url ?? result.source?.url ?? "").hostname.replace(
          "www.",
          ""
        )
      : null;
  const firstLine = result.title ?? result.source?.title ?? "Untitled";
  const secondLine = page ?? result.author ?? url;
  const Icon = getTypeIcon(result.type ?? result._type);
  return (
    <Link href={href} className={styles.result} onClick={onClick}>
      <Icon className={styles.resultIcon} />
      <div className={styles.resultText}>
        <p className={styles.firstLine}>{firstLine}</p>
        {secondLine && <p className={styles.secondLine}>{secondLine}</p>}
      </div>
    </Link>
  );
}
