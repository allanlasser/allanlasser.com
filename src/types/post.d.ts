import * as Schema from "src/providers/sanity/schema";
import { Source } from "./source";

export interface Post {
  _type: "post";
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  slug: {
    _type: "slug";
    current: string;
  };
  publishedAt: string;
  title?: string;
  body: Schema.BlockContent;
  source?: Source;
}
