import { NextPage } from "next";
import { Bookmark, getRecentBookmarks } from "src/providers/pinboard";
import { BookmarkList } from "src/components/bookmarks";
import Page from "src/components/page";

interface HomePageProps {
  bookmarks: Bookmark[];
}

const HomePage: NextPage<HomePageProps> = (props) => (
  <Page htmlTitle='Allan Lasser' title='Bookmarks'>
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
