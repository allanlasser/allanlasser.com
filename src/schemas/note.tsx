import React from "react";
import { Bookmark } from "lucide-react";

const Note = {
  name: "note",
  title: "Note",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "body",
      title: "Body",
      type: "markdown",
    },
    {
      name: "source",
      title: "Source",
      type: "reference",
      to: { type: "source" },
    },
    {
      name: "page",
      title: "Page",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "title",
      sourceTitle: "source.title",
      page: "page",
      body: "body",
    },
    prepare(selection) {
      const { title, sourceTitle, page, body } = selection;
      let subtitle = page ? `pg. ${page}` : "";
      if (title && sourceTitle) {
        subtitle = `${sourceTitle}${page ? `, ${subtitle}` : ""}`;
      }
      return {
        title: title ?? sourceTitle ?? "Untitled",
        subtitle,
        media: <Bookmark strokeWidth={1.5} />,
        body,
      };
    },
  },
};

export default Note;
