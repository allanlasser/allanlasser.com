export type SourceType = "article" | "book" | "video";

export interface Source {
  _id: string;
  _createdAt: string;
  type: SourceType;
  url: string | null;
  isbn: string | null;
  title: string | null;
  author: string | null;
}
