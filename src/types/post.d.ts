import * as Schema from "src/providers/sanity/schema";

export interface Post {
  _type: "post";
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  publishedAt: string;
  title: string;
  layout: "essay" | "gallery" | string;
  slug: {
    _type: "slug";
    current: string;
  };
  body: Schema.BlockContent;
}
