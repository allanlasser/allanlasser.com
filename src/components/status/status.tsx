import styles from "./status.module.css";
import smartquotes from "smartquotes";

export default function Status({ children }: React.PropsWithChildren<{}>) {
  return <p className={styles.status}>{smartquotes(children)}</p>;
}
