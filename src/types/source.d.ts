export type SourceType = "article" | "book" | "video";

export interface Source {
  _id: string;
  _createdAt: string;
  type: SourceType;
  title: string | null;
  url?: string | null;
  isbn?: string | null;
  subtitle?: string | null;
  author?: string | null;
  imageUrl?: string | null;
}
