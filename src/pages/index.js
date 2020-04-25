import fetch from 'isomorphic-fetch'
import qs from 'qs'

/* Bookmarks come from the Pinboard API. */
const BookmarkList = ({bookmarks}) => (
	<ul>
		{bookmarks.map(bookmark => (
			<li key={bookmark.hash}>
				<a href={bookmark.href}>{bookmark.description}</a>
			</li>
		))}
	</ul>
)

export default (props) => (
	<div>
		<section id="biography">
			<h1>Allan Lasser</h1>
		</section>
		<section id="reading">
			<h2>Reading</h2>
			<BookmarkList bookmarks={props.bookmarks} />
		</section>
	</div>
)

export async function getStaticProps(context) {
	async function getRecentBookmarks(tags) {
		const query = qs.stringify({
			auth_token: process.env.PINBOARD_API_TOKEN,
			tag: tags,
			format: 'json'
		})
		const res = await fetch(`https://api.pinboard.in/v1/posts/recent?${query}`)
		const data = await res.json()
		return data.posts
	}
	const bookmarks = await getRecentBookmarks('Instapaper')
	return {
		props: {
			bookmarks
		}
	}
}
