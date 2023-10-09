import React from "react";
import cx from "classnames";

import typography from "src/styles/typography.module.css";
import styles from "./page.module.css";
import Navigation from "../navigation";
import Search from "../search";

export interface PageProps {
  htmlTitle?: string;
  title?: string;
}

export default function Page(props: React.PropsWithChildren<PageProps>) {
  const { title } = props;
  const isDev = process.env.NODE_ENV === "development";
  return (
    <div className={cx(typography.text)}>
      <header className={cx(styles.container)}>
        {isDev && <div className={styles.envBanner}>Dev Mode</div>}
        <Navigation />
        <Search className={styles.searchBar} />
      </header>
      <main className={cx(styles.container)}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {props.children}
      </main>
    </div>
  );
}
