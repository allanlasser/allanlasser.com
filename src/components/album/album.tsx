import Image from "next/image";
import cx from "classnames";
import styles from "./album.module.css";

export interface AlbumImage {
  _id: string;
  src: string;
  title: string | null;
  alt: string | null;
}

export default function Album({ images }: { images: AlbumImage[] }) {
  return (
    <>
      <div className={cx(styles.album, styles.horizontal)}>
        {images.map((image, idx) => (
          <figure className={styles.image} key={image._id}>
            <Image
              src={image.src}
              title={image.title ?? ""}
              alt={image.alt ?? ""}
              fill
              sizes='(max-width: 768px) 90vw, (max-width: 1200px) 50vw'
              priority={idx < 2}
            />
          </figure>
        ))}
      </div>
      <div className={styles.heightShim} />
    </>
  );
}
