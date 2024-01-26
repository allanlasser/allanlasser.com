const homepage = {
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "status",
      title: "Status",
      type: "string",
    },
    {
      name: "bio",
      title: "Biography",
      type: "markdown",
    },
    {
      name: "reading",
      title: "Currently Reading",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "source" }],
        },
      ],
    },
    {
      name: "read",
      title: "Recently Read",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "source" }],
        },
      ],
      options: {
        layout: "tags",
      },
    },
  ],
};

export default homepage;
