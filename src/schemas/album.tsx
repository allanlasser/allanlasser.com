import { ImageIcon } from "lucide-react";

export const album = {
  name: "album",
  type: "document",
  title: "Album",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "images",
      title: "Images",
      type: "array", // supports drag'n'drop of multiple files
      options: {
        layout: "grid",
      },
      of: [
        {
          type: "image",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      images: "images",
    },
    prepare(selection) {
      const { title, images } = selection;
      const imgCount = images.length;
      return {
        title,
        subtitle: `${imgCount} image${imgCount === 1 ? "" : "s"}`,
        media: <ImageIcon strokeWidth={1.5} />,
      };
    },
  },
};

export default album;
