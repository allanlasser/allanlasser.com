import React from "react";
import getStatus from "src/data/getStatus";
import styles from "./status.module.css";

export const revalidate = 60;

export default async function Status({
  children,
}: React.PropsWithChildren<{}>) {
  const status = await getStatus();
  return <p className={styles.status}>{status}</p>;
}
