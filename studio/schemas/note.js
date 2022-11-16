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
      type: "number",
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
      };
    },
  },
};

export default Note;
