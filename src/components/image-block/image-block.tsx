
import cx from 'classnames';
import Image from "next/image";
import styles from './image-block.module.css';

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

function SourceLink({source, children}: React.PropsWithChildren<{source?: string}>) {
  if (source) {
    return <a className={styles.sourceLink} href={source} rel="noreferrer" target="_blank">{children}</a>
  }
  return <>children</>;
}

export default function ImageBlock(props: ImageBlockProps) {
  const {src, width, height, alt, title, author, credit, caption, source, alignment} = props;
  return (
    <figure className={cx(styles.imageBlock, styles[alignment ?? 'left'])}>
      <div className={styles.imageBlockImage}><Image
        alt={alt ?? ''}
        title={title}
        width={width}
        height={height}
        src={src ?? ""}
        sizes='100vw'
      /></div>
      {(title || caption || author) && (
        <figcaption className={styles.imageBlockCaption}>
          {title && <div className={styles.title}>{title}</div>}
          {author && <div className={styles.author}>{author}</div>}
          {credit && <SourceLink source={source}><cite className={styles.imageBlockCredit}>{credit}</cite></SourceLink>}
        </figcaption>
      )}
    </figure>
  );
}