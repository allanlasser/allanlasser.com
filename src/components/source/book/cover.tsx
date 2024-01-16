import cx from "classnames";
import { srcFor } from "src/providers/sanity";
import styles from "./book.module.css";

const imageSize = {
  large: [250, 375],
  medium: [100, 150],
  small: [50, 75],
};

interface CoverProps {
  url: string;
  size: "small" | "medium" | "large";
  title?: string | null;
}

export default function Cover(props: CoverProps) {
  const { url, size, title } = props;
  return (
    <figure className={cx(styles[size], styles.bookCover)}>
      <picture>
        <img
          alt={title ? `The cover of the book ${title}` : `Book cover`}
          src={
            srcFor(url)
              .width(imageSize[size][0] * 2)
              .height(imageSize[size][1] * 2)
              .crop("center")
              .url() ?? ""
          }
          style={{ objectFit: "contain" }}
        />
      </picture>
    </figure>
  );
}
