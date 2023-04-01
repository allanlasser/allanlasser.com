const homepage = {
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    {
      name: "status",
      title: "Status",
      type: "string",
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
