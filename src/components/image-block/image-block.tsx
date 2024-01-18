import cx from "classnames";
import Image from "next/image";
import styles from "./image-block.module.css";
import smartquotes from "smartquotes";

export interface ImageBlockProps {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
  title?: string;
  author?: string;
  credit?: string;
  caption?: string;
  source?: string;
  alignment?: "left" | "right" | "center";
}

function SourceLink({
  href,
  children,
}: React.PropsWithChildren<{ href?: string }>) {
  if (href) {
    return (
      <a
        className={styles.sourceLink}
        href={href}
        rel='noreferrer'
        target='_blank'
      >
        {children}
      </a>
    );
  }
  return <span className={styles.sourceLink}>{children}</span>;
}

function ImageBlockCaption({
  title,
  author,
  credit,
  caption,
  source,
}: Partial<ImageBlockProps>) {
  if (!title && !author && !credit && !caption && !source) return null;
  return (
    <figcaption className={styles.imageBlockCaption}>
      {title && <p className={styles.title}>{smartquotes(title)}</p>}
      {caption && <p className={styles.caption}>{smartquotes(caption)}</p>}
      {(credit || author) && (
        <SourceLink href={source}>
          {smartquotes(credit ?? author ?? "Source")}
        </SourceLink>
      )}
    </figcaption>
  );
}

export default function ImageBlock(props: ImageBlockProps) {
  const {
    src,
    width,
    height,
    alt,
    title,
    author,
    credit,
    caption,
    source,
    alignment,
  } = props;
  return (
    <figure className={cx(styles.imageBlock, styles[alignment ?? "center"])}>
      <Image
        className={styles.imageBlockImage}
        alt={alt ?? ""}
        title={title}
        width={width}
        height={height}
        src={src ?? ""}
        sizes='100vw'
      />
      <ImageBlockCaption {...props} />
    </figure>
  );
}
