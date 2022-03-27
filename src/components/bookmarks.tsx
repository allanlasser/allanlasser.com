import cn from "classnames";
import type { Bookmark } from "src/providers/pinboard";
import list from "src/styles/list.module.css";
import typography from "src/styles/typography.module.css";
import bookmarkStyle from "src/styles/bookmark.module.css";

export interface BookmarkListItemProps {
  title: string;
  ts: string;
  href: string;
}

export const BookmarkListItem: React.FC<BookmarkListItemProps> = ({
  href,
  title,
  ts,
}) => {
  const time = new Date(ts);
  return (
    <div className={cn(bookmarkStyle.container)}>
      <time className={cn(typography.data, bookmarkStyle.time)} title={ts}>
        {time.toLocaleDateString()}
      </time>
      <p className={cn(typography.title, bookmarkStyle.title)}>
        <a href={href}>{title}</a>
      </p>
      <p className={cn(typography.data, bookmarkStyle.url)}>{href}</p>
    </div>
  );
};

export interface BookmarkListProps {
  bookmarks: Bookmark[];
}

/* Bookmarks come from the Pinboard API. */
export const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks }) => (
  <ul className={cn(list.noStyle)}>
    {bookmarks.map((bookmark) => (
      <li key={bookmark.hash}>
        <BookmarkListItem
          href={bookmark.href}
          ts={bookmark.time}
          title={bookmark.description}
        />
      </li>
    ))}
  </ul>
);
