export const position = {
  title: "Position",
  name: "position",
  type: "object",
  fields: [
    { name: "role", type: "string", title: "Role" },
    { name: "company", type: "string", title: "Company" },
    { name: "description", type: "text", title: "Description" },
    { name: "startDate", type: "string", title: "From" },
    { name: "endDate", type: "string", title: "Until" },
  ],
};

const resume = {
  name: "resume",
  title: "Resume",
  type: "document",
  __experimental_actions: ["create", "update", /*'delete',*/ "publish"],
  fields: [
    {
      type: "array",
      name: "history",
      of: [{ type: "position" }],
    },
  ],
};

export default resume;
