import cx from "classnames";
import Link from "next/link";
import styles from "./navigation.module.css";
import Status from "src/components/status";
import { GitHub, Mastodon, Initial, Bluesky } from "src/components/icons";
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
          <Link
            href='/'
            title={title ?? process.env.SITE_TITLE ?? "Allan Lasser"}
          >
            Allan Lasser
          </Link>
          {/* <Status>{status}</Status> */}
        </div>
      </div>
      <div className={cx(styles.links)}>
        <ul className={cx(styles.internalLinks)}>
          <li>
            <Link href='/shelf'>Library</Link>
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
          <li>
            <a
              href='https://bsky.app/profile/allanlasser.com'
              target='_blank'
              rel='nofollow noopener noreferrer me'
            >
              <Bluesky className={cx(styles.icon)} aria-label='Bluesky' />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
