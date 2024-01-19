import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import styles from "./navigation.module.css";
import Status from "src/components/status";
import { GitHub, Mastodon } from "src/components/icons";
import getTitle from "src/data/getTitle";
import getStatus from "src/data/getStatus";

export const revalidate = 60;

export default async function Navigation() {
  const title = await getTitle();
  const status = await getStatus();
  return (
    <div className={cx(styles.container)}>
      <div className={cx(styles.identity)}>
        <div className={cx(styles.masthead)}>
          <h1>
            <Link href='/'>
              {title ?? process.env.SITE_TITLE ?? "Allan Lasser"}
            </Link>
          </h1>
          <Status>{status}</Status>
        </div>
      </div>
      <div className={cx(styles.links)}>
        <ul className={cx(styles.internalLinks)}>
          <li>
            <Link href='/shelf'>Shelf</Link>
          </li>
          <li>
            <Link href='/portfolio'>Portfolio</Link>
          </li>
          <li>
            <Link href='/resume'>Résumé</Link>
          </li>
        </ul>
        <ul className={cx(styles.externalLinks)}>
          <li>
            <a
              href='https://github.com/allanlasser'
              target='_blank'
              rel='nofollow noopener noreferrer'
            >
              <GitHub
                className={cx(styles.icon, styles.githubIcon)}
                aria-label='GitHub'
              />
            </a>
          </li>
          <li>
            <a
              href='https://tilde.zone/@allan'
              target='_blank'
              rel='nofollow noopener noreferrer me'
            >
              <Mastodon className={cx(styles.icon)} aria-label='Mastodon' />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
