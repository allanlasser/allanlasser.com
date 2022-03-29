import React from "react";
import cx from "classnames";
import Link from "next/link";
import useSmartquotes from "src/hooks/useSmartquotes";
import typography from "src/styles/typography.module.css";
import styles from "./page.module.css";

export interface PageProps {
  title?: string;
}

const Page: React.FC<PageProps> = (props) => {
  useSmartquotes();
  return (
    <div className={cx(styles.container, typography.text)}>
      <header className={cx(styles.header)}>
        <div>
          <h1>
            <Link href='/'>
              <a>Allan Lasser</a>
            </Link>
          </h1>
          <p>Product Designer &amp; Web Developer</p>
        </div>
        <ul className={cx(styles.links)}>
          <li>
            <Link href='/resume'>
              <a>Resume</a>
            </Link>
          </li>
          <li>
            <a
              href='https://github.com/allanlasser/allanlasser.com'
              target='_blank'
              rel='noreferrer'
            >
              GitHub
            </a>
          </li>
        </ul>
      </header>
      {props.children}
    </div>
  );
};

export default Page;
