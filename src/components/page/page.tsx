import React from "react";
import cx from "classnames";
import Link from "next/link";
import useSmartquotes from "src/hooks/useSmartquotes";
import typography from "src/styles/typography.module.css";
import styles from "./page.module.css";
import Head from "next/head";

export interface PageProps {
  htmlTitle?: string;
  title?: string;
}

export const GitHub = (props: React.ComponentProps<"svg">) => (
  <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
    <path
      fillRule='evenodd'
      d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
      clipRule='evenodd'
    />
  </svg>
);

function getPageTitle({ title, htmlTitle }: PageProps) {
  const defaultTitle = "Allan Lasser";
  if (htmlTitle) return htmlTitle;
  if (title) return `${title} • ${defaultTitle}`;
  return defaultTitle;
}

const Page: React.FC<PageProps> = (props) => {
  const { title } = props;
  useSmartquotes();
  return (
    <div className={cx(styles.container, typography.text)}>
      <Head>
        <title>{getPageTitle(props)}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type='image/x-icon' href='/static/favicon.ico' />
      </Head>
      <header className={cx(styles.header)}>
        <div>
          <h1>
            <Link href='/'>Allan Lasser</Link>
          </h1>
          <p>Product Designer &amp; Web Developer</p>
        </div>
        <ul className={cx(styles.links)}>
          <li>
            <Link href='/portfolio'>Portfolio</Link>
          </li>
          <li>
            <Link href='/resume'>Résumé</Link>
          </li>
          <li>
            <a
              href='https://github.com/allanlasser/allanlasser.com'
              target='_blank'
              rel='noreferrer'
            >
              <GitHub className={cx(styles.icon)} aria-label='GitHub' />
            </a>
          </li>
        </ul>
      </header>
      <main className={styles.main}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {props.children}
      </main>
    </div>
  );
};

export default Page;
