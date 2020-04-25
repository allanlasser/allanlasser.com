import Head from 'next/head'
import { BookmarkList } from '../app/components/bookmarks'
import Page from '../app/components/page'
import { getRecentBookmarks } from '../app/providers/pinboard'

export default (props) => (
	<Page title="Reading">
		<Head>
			<title>Allan Lasser</title>
			<link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
			<link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&family=Source+Serif+Pro:wght@700&display=swap" rel="stylesheet" />
		</Head>
		<BookmarkList bookmarks={props.bookmarks} />
	</Page>
)

export async function getStaticProps(context) {
	return {
		props: {
			bookmarks: await getRecentBookmarks('Instapaper')
		}
	}
}
