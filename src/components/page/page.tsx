import React from "react";
import cx from "classnames";

import typography from "src/styles/typography.module.css";
import styles from "./page.module.css";

export interface PageProps {
  htmlTitle?: string;
  title?: string;
}

export default function Page(props: React.PropsWithChildren<PageProps>) {
  const { title } = props;
  return (
    <div className={cx(typography.text)}>
      <main className={cx(styles.container)}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {props.children}
      </main>
    </div>
  );
}
