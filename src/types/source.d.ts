export type SourceType = "article" | "book" | "video";

export interface Source {
  _id: string;
  _createdAt: string;
  type: SourceType;
  url: string | null;
  isbn: string | null;
  title: string | null;
  subtitle: string | null;
  author: string | null;
  imageUrl?: string | null;
}
