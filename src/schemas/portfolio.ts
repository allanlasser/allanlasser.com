const portfolio = {
  name: "portfolio",
  title: "Portfolio",
  type: "document",
  fields: [
    {
      name: "personalStatement",
      title: "Personal Statement",
      type: "blockContent",
    },
    {
      name: "projects",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
        },
      ],
    },
  ],
};

export default portfolio;
