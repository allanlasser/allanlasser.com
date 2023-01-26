import Source from "./source";

export interface Note {
  _id: string;
  _createdAt: string;
  body: string;
  page: string | null;
  source: Source;
}
