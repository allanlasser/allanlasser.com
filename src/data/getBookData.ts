export interface BookData {
  publishers?: string[];
  publishedOn?: string;
  pageCount?: number;
}

/** Given an ISBN, get additional book data from the OpenLibrary API */
export default async function getBookData(isbn: string): Promise<BookData> {
  const res = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
  const json = res.ok ? await res.json() : {};
  return {
    publishers: json.publishers,
    publishedOn: json.publish_date,
    pageCount: json.number_of_pages,
  };
}
