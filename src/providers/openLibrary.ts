const OPEN_LIBRARY = "https://openlibrary.org";
const OPEN_LIBRARY_COVERS = "https://covers.openlibrary.org";

export interface OLBook {
  key: string;
  title: string;
  subtitle?: string;
  authors: OLRef[];
  publishers: string[];
  number_of_pages: number;
  isbn_10?: string[];
  isbn_13?: string[];
  covers: number[];
  lc_classifications: string[];
  latest_revision: number;
  publish_places: string[];
  oclc_number: string[];
  pagination: string;
  revision: number;
  source_records: string[];

  notes: Text;
  identifiers: {
    goodreads: string[];
    librarything: string[];
  };
  created: Date;
  languages: OLRef[];
  subjects: string[];
  publish_date: string;
  publish_country: string;
  last_modified: Date;
  by_statement: string;
  works: OLRef[];
  type: OLRef;
  location: string[];
}

interface OLRef {
  key: string;
}

interface InlineData {
  type: string;
  value: string;
}

interface Text extends InlineData {
  type: "/type/text";
}

interface Date extends InlineData {
  type: "/type/datetime";
}

/** Given an ISBN, get additional book data from the OpenLibrary API */
export async function getBookData(isbn: string): Promise<OLBook | null> {
  const res = await fetch(`${OPEN_LIBRARY}/isbn/${isbn}.json`);
  let data: OLBook | null;
  try {
    data = res.status === 200 ? ((await res.json()) as OLBook) : null;
  } catch (e) {
    data = null;
  }
  return data;
}

export async function getBookCover(
  isbn: string,
  size: "S" | "M" | "L" = "L"
): Promise<Blob | null> {
  const res = await fetch(`${OPEN_LIBRARY_COVERS}/b/isbn/${isbn}-${size}.jpg`);
  if (res.ok) {
    return res.blob();
  }
  return null;
}

export async function getBookAuthor(key: string): Promise<string> {
  const json = await fetch(`${OPEN_LIBRARY}${key}.json`).then((res) =>
    res.json()
  );
  return json?.name;
}
