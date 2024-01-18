import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import * as Schema from "src/providers/sanity/schema";
import { srcFor, dimensionsFor } from "src/providers/sanity";
import styles from "./block-content.module.css";
import CodeBlock from "src/components/code-block";
import ImageBlock from "../image-block";
import AlbumBlock from "../album/album";
import NoteBlock from "../notes/NoteBlock";
import smartPortableText from "src/utils/smartPortableText";

const components: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      const { width, height } = dimensionsFor(value);
      const src = srcFor(value).width(width).height(height).url();
      return <ImageBlock src={src} width={width} height={height} {...value} />;
    },
    code: ({ value }) => (
      <CodeBlock
        title={value.filename}
        language={value.language}
        code={value.code}
      />
    ),
    album: ({ value }) => <AlbumBlock images={value.images} />,
    note: ({ value }) => <NoteBlock note={value} />,
  },
};

const BlockContent = (props: { value: Schema.BlockContent }) => {
  const smartText = smartPortableText(props.value);
  return (
    <div className={styles.blockContent}>
      <PortableText value={smartText} components={components} />
    </div>
  );
};

export default BlockContent;
