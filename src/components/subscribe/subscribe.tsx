import Link from "next/link";
import cx from "classnames";
import { MailIcon, RssIcon } from "lucide-react";
import styles from "./subscribe.module.css";

export interface NewsletterSignupProps {}

export default async function NewsletterSignup(props: NewsletterSignupProps) {
  async function handleSignup(formData: FormData) {
    "use server";

    console.log(formData.get("email"));
  }

  return (
    <div className={styles.container}>
      <form action={handleSignup} className={styles.signupForm}>
        <label htmlFor='emailInput' className={styles.icon}>
          <MailIcon />
        </label>
        <input
          id='emailInput'
          type='email'
          name='email'
          required
          placeholder='your@email.address'
        />
        <button
          className={styles.button}
          type='submit'
          title='Subscribe via Email'
        >
          Subscribe
        </button>
      </form>
      <Link
        title='Subscribe via RSS'
        href='/feeds/rss.xml'
        className={cx(styles.button, styles.icon, styles.rss)}
      >
        <RssIcon strokeWidth={2} />
      </Link>
    </div>
  );
}
