const breakBlock = {
  name: "break",
  type: "object",
  title: "Break",
  fields: [
    {
      name: "style",
      type: "string",
      options: {
        list: ["break", "readMore"],
      },
    },
  ],
  initialValue: {
    style: "break",
  },
};

export default breakBlock;
