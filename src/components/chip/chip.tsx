import cx from "classnames";
import styles from "./chip.module.css";

export default function Chip({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return <span className={cx(styles.chip, className)}>{children}</span>;
}
