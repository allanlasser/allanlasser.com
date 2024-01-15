const Post = {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc) => {
          return `${doc.publishedAt?.split("T")[0] ?? ""} ${doc.title ?? ""}`;
        },
        maxLength: 96,
      },
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
    {
      name: "source",
      title: "Source",
      type: "reference",
      to: { type: "source" },
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "publishedAt",
      sourceTitle: "source.title",
      body: "body",
    },
    prepare(selection) {
      const { title, date, sourceTitle, body } = selection;
      let subtitle = date ? new Date(date).toLocaleString("en") : "";
      let previewTitle = title ?? sourceTitle;
      if (!previewTitle) {
        const block = body.find((block) => block._type === "block");
        previewTitle = block?.children
          .filter((child) => child._type === "span")
          .map((span) => span.text)
          .join("");
      }
      return {
        title: previewTitle ?? "",
        subtitle,
      };
    },
  },
};

export default Post;
