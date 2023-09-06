"use client";

import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import { Schema, srcFor, dimensionsFor } from "src/providers/sanity";
import styles from "./block-content.module.css";
import CodeBlock from "src/components/code-block";
import ImageBlock from "../image-block";
import AlbumBlock from "../album/album";
import NoteItem from "../note-item/note-item";
import Link from "next/link";

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
    album: ({ value }) => {
      return <AlbumBlock images={value.images} />;
    },
    note: ({ value }) => {
      return (
        <figure className={styles.noteBlock}>
          <NoteItem note={value} omitSource />
        </figure>
      );
    },
  },
};

const BlockContent = (props: { value: Schema.BlockContent }) => (
  <div className={styles.blockContent}>
    <PortableText value={props.value} components={components} />
  </div>
);

export default BlockContent;
