import Head from 'next/head'
import { BookmarkList } from '../app/components/bookmarks'
import Page from '../app/components/page'
import { getRecentBookmarks } from '../app/providers/pinboard'

export default (props) => (
	<Page title="Reading">
		<Head>
			<title>Allan Lasser</title>
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
