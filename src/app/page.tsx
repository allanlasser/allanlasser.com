import { getRecentBookmarks } from "src/providers/pinboard";
import { BookmarkList } from "src/components/bookmarks";

export default async function HomePage({ children }) {
  const bookmarks = await getRecentBookmarks("Instapaper");
  return (
    <>
      <h1>Reading log</h1>
      <BookmarkList bookmarks={bookmarks} />
    </>
  );
}

// export async function getStaticProps() {
//   return {
//     props: {
//       bookmarks:
//     },
//     revalidate: 3600,
//   };
// }
