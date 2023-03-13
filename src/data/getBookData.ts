export interface BookData {
  publishers?: string[];
  publishedOn?: string;
  pageCount?: number;
}

/** Given an ISBN, get additional book data from the OpenLibrary API */
export default async function getBookData(isbn: string): Promise<BookData> {
  const res = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
  let json;
  try {
    json = res.status === 200 ? await res.json() : {};
  } catch (e) {
    json = {};
  }
  return {
    publishers: json.publishers,
    publishedOn: json.publish_date,
    pageCount: json.number_of_pages,
  };
}
