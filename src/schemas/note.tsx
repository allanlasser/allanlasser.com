import React from "react";
import { Bookmark } from "lucide-react";

const Note = {
  name: "note",
  title: "Note",
  type: "document",
  fields: [
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
      title: "source.title",
      page: "page",
    },
    prepare(selection) {
      const { title, page } = selection;
      return {
        title,
        subtitle: page ? `pg. ${page}` : null,
        media: <Bookmark strokeWidth={1.5} />,
      };
    },
  },
};

export default Note;
