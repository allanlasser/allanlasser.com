import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import styles from "./navigation.module.css";
import Status from "src/components/status";
import { GitHub, Mastodon } from "src/components/icons";

export default function Navigation() {
  return (
    <div className={cx(styles.container)}>
      <div className={cx(styles.identity)}>
        <Link href='/' className={cx(styles.avatar)}>
          <Image
            alt='An avatar for Allan'
            src='/static/avatar.png'
            fill
            sizes='(-webkit-min-device-pixel-ratio: 2) 6rem, 
                  (min-resolution: 192dpi) 6rem,
                  3rem'
          />
        </Link>
        <div className={cx(styles.masthead)}>
          <h1>
            <Link href='/'>Allan Lasser</Link>
          </h1>
          {/** @ts-expect-error Server Component */}
          <Status />
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
