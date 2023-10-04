export const position = {
  title: "Position",
  name: "position",
  type: "object",
  fields: [
    { name: "role", type: "string", title: "Role" },
    {
      name: "company",
      title: "Company",
      type: "reference",
      to: [{ type: "company" }],
    },
    { name: "description", type: "text", title: "Description" },
    { name: "startDate", type: "string", title: "From" },
    { name: "endDate", type: "string", title: "Until" },
  ],
};

const resume = {
  name: "resume",
  title: "Resume",
  type: "document",
  fields: [
    {
      name: "history",
      type: "array",
      of: [{ type: "position" }],
    },
    {
      name: "skills",
      type: "array",
      of: [{ type: "string" }],
      layout: "tags",
    },
  ],
};

export default resume;
