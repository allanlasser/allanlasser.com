import React from "react";
import { Book, FileText, FileVideo } from "lucide-react";

const SourceTypes = [
  { title: "Article", value: "article" },
  { title: "Book", value: "book" },
  { title: "Video", value: "video" },
];

const SourceTypeIcons = {
  book: Book,
  article: FileText,
  video: FileVideo,
};

const Source = {
  name: "source",
  title: "Source",
  type: "document",
  fields: [
    {
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: SourceTypes,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "url",
      title: "URL",
      type: "url",
      hidden: ({ document }) => document?.type === "book",
    },
    {
      name: "isbn",
      title: "ISBN",
      type: "string",
      hidden: ({ document }) => document?.type !== "book",
    },
    {
      name: "author",
      title: "Author",
      type: "string",
      hidden: ({ document }) => document?.type !== "book",
    },
    {
      name: "cover",
      title: "Cover",
      type: "image",
      hidden: ({ document }) => document?.type !== "book",
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: "title",
      url: "url",
      author: "author",
      type: "type",
    },
    prepare(selection) {
      const { title, url, author, image, type } = selection;
      const Icon = SourceTypeIcons[type];
      return {
        title,
        subtitle: `${author ?? url}`,
        media: <Icon strokeWidth={1.5} />,
      };
    },
  },
};

export default Source;
