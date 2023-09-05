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
        {images.map((image) => (
          <figure className={styles.image} key={image._id}>
            <Image
              src={image.src}
              title={image.title ?? ""}
              alt={image.alt ?? ""}
              fill
            />
          </figure>
        ))}
      </div>
      <div className={styles.heightShim} />
    </>
  );
}
