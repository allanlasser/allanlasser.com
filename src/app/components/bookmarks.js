import cn from 'classnames'
import list from '../styles/list.module.css'
import typography from '../styles/typography.module.css'
import bookmarkStyle from '../styles/bookmark.module.css'

export const Bookmark = ({href, title, ts}) => {
	const time = new Date(ts)
	return (
		<div className={cn(bookmarkStyle.container)}>
			<time className={cn(typography.data, bookmarkStyle.time)} title={time}>
				{time.toLocaleDateString()}
			</time>
			<p className={cn(typography.text, typography.title, bookmarkStyle.title)}>
				<a href={href}>{title}</a>
			</p>
			<p className={cn(typography.data, bookmarkStyle.url)}>{href}</p>
		</div>
	)
}

/* Bookmarks come from the Pinboard API. */
export const BookmarkList = ({bookmarks}) => (
	<ul className={cn(list.noStyle)}>
		{bookmarks.map(bookmark => (
			<li key={bookmark.hash}>
				<Bookmark href={bookmark.href} ts={bookmark.time} title={bookmark.description} />
			</li>
		))}
	</ul>
)