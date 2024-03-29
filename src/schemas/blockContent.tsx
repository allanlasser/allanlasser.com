import {
  ImageIcon,
  BookmarkIcon,
  BookImageIcon,
  FlipVertical,
  FlipVerticalIcon,
} from "lucide-react";
import BlockEditor from "src/components/block-editor";
import { NotePreview } from "src/components/notes/NotePreview";

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
const blockContent = {
  title: "Block Content",
  name: "blockContent",
  type: "array",
  components: {
    input: BlockEditor,
  },
  of: [
    {
      title: "Block",
      type: "block",
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              },
            ],
          },
        ],
      },
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: "break",
      name: "break",
      title: "Break",
      icon: <FlipVerticalIcon size={20} strokeWidth={1.5} />,
      components: {
        preview: () => <hr />,
      },
    },
    {
      name: "note",
      title: "Note",
      type: "reference",
      to: [{ type: "note" }],
      icon: <BookmarkIcon size={20} strokeWidth={1.5} />,
      components: {
        preview: NotePreview,
      },
    },
    {
      type: "code",
      title: "Code",
      options: {
        withFilename: true,
      },
    },
    {
      type: "image",
      title: "Image",
      icon: <ImageIcon size={20} strokeWidth={1.5} />,
      options: { hotspot: true },
      fields: [
        {
          name: "title",
          type: "string",
          title: "Title",
        },
        {
          name: "author",
          type: "string",
          title: "Author",
        },
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
        {
          name: "credit",
          type: "string",
          title: "Credit",
        },
        {
          name: "source",
          type: "url",
          title: "Source",
        },
        {
          name: "alignment",
          type: "string",
          title: "Alignment",
          options: {
            list: [
              { title: "Left", value: "left" },
              { title: "Center", value: "center" },
              { title: "Right", value: "right" },
            ],
          },
        },
      ],
    },
    {
      name: "album",
      title: "Album",
      type: "reference",
      to: [{ type: "album" }],
      icon: <BookImageIcon size={20} strokeWidth={1.5} />,
    },
  ],
};

export default blockContent;
