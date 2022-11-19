export interface Source {
  _id: string;
  _createdAt: string;
  type: "article" | "book" | "video";
  url: string | null;
  isbn: string | null;
  title: string | null;
  author: string | null;
}
