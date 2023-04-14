
import cx from 'classnames';
import Image from "next/image";
import styles from './image-block.module.css';

export interface ImageBlockProps {
  src: string;
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
  const {src, alt, title, author, credit, caption, source, alignment} = props;
  return (
    <figure className={cx(styles.imageBlock, styles[alignment ?? 'left'])}>
      <Image
        alt={alt ?? ''}
        title={title}
        width='2400'
        height='1800'
        src={src ?? ""}
        sizes='100vw'
        style={{
          width: "100%",
          height: "auto",
        }}
      />
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