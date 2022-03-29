import { NextPage } from "next";
import Head from "next/head";
import { Bookmark, getRecentBookmarks } from "src/providers/pinboard";
import { BookmarkList } from "src/components/bookmarks";
import Page from "src/components/page";
import typography from "src/styles/typography.module.css";

interface HomePageProps {
  bookmarks: Bookmark[];
}

const HomePage: NextPage<HomePageProps> = (props) => (
  <Page title='Reading'>
    <Head>
      <title>Allan Lasser</title>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' type='image/x-icon' href='/static/favicon.ico' />
    </Head>
    <BookmarkList bookmarks={props.bookmarks} />
  </Page>
);

export default HomePage;

export async function getStaticProps() {
  return {
    props: {
      bookmarks: await getRecentBookmarks("Instapaper"),
    },
    revalidate: 3600,
  };
}
