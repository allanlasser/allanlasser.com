import Image from "next/image";
import cx from "classnames";
import styles from "./album.module.css";
import { srcFor, dimensionsFor } from "src/providers/sanity";
import { SanityImageAsset, SanityReference } from "src/providers/sanity/schema";

const IMAGE_MAX = 1800;

interface AlbumImage {
  asset: SanityReference<SanityImageAsset>;
  _id: string;
  src: string;
  title: string | null;
  alt: string | null;
}

function AlbumImage({
  image,
  priority,
}: {
  image: AlbumImage;
  priority?: boolean;
}) {
  const { width, height } = dimensionsFor(image);
  const aspectRatio = width / height;
  let maxWidth, maxHeight;
  if (width > height) {
    maxWidth = IMAGE_MAX;
    maxHeight = Math.round(maxWidth / aspectRatio);
  } else {
    maxHeight = IMAGE_MAX;
    maxWidth = Math.round(maxHeight * aspectRatio);
  }
  const src = srcFor(image).width(maxWidth).height(maxHeight).url();
  return (
    <figure
      className={styles.imageFigure}
      key={image._id}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <Image
        className={styles.image}
        src={src}
        title={image.title ?? ""}
        alt={image.alt ?? ""}
        width={maxWidth}
        height={maxHeight}
        sizes='(max-width: 768px) 90vw, (max-width: 1200px) 50vw'
        priority={priority}
      />
    </figure>
  );
}

export default function Album({ images }: { images: AlbumImage[] }) {
  return (
    <div className={styles.container}>
      <div className={cx(styles.album, styles.horizontal)}>
        {images.map((image, idx) => (
          <AlbumImage key={image._id} image={image} priority={idx < 3} />
        ))}
      </div>
      <div className={cx(styles.shim)} />
    </div>
  );
}
