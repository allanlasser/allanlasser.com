"use client";

import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import Image from "next/image";
import { Schema, srcFor } from "src/providers/sanity";
import styles from "./block-content.module.css";

const components: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      const src = srcFor(value).width(1200).height(900).url();
      return (
        <Image
          alt=''
          width='2400'
          height='1800'
          src={src ?? ""}
          sizes='100vw'
          style={{
            width: "100%",
            height: "auto",
          }}
        />
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
