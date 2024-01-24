"use client";

import { SyntheticEvent, useTransition } from "react";
import Link from "next/link";
import cx from "classnames";
import { MailCheckIcon, MailIcon, RssIcon } from "lucide-react";
import typography from "src/styles/typography.module.css";
import styles from "./subscribe.module.css";
import { handleSignup } from "./actions";
import { useFormState } from "react-dom";

export interface NewsletterSignupProps {
  subscriber?: string;
}

export default function NewsletterSignup(props: NewsletterSignupProps) {
  const [isPending, startTransition] = useTransition();
  const [formState, formAction] = useFormState(handleSignup, {});

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      await formAction(formData);
    });
  }

  return (
    <div>
      {formState.error && (
        <p className={cx(styles.error, typography.finePrint)}>
          {formState.message}
        </p>
      )}
      <div className={styles.container}>
        {formState.success ? (
          <div className={cx(styles.signupForm, styles.success)}>
            <span className={cx(styles.icon, styles.success)}>
              <MailCheckIcon />
            </span>
            <p>{formState.message}</p>
            <span></span>
          </div>
        ) : (
          <form
            action={formAction}
            onSubmit={handleSubmit}
            className={cx(styles.signupForm, {
              [styles.error]: formState.error,
            })}
          >
            <label htmlFor='emailInput' className={styles.icon}>
              <MailIcon />
            </label>
            <input
              id='emailInput'
              type='email'
              name='email'
              required
              placeholder='your@email.address'
              disabled={isPending}
            />
            <button
              className={styles.button}
              type='submit'
              title='Subscribe via Email'
              disabled={isPending}
            >
              Subscribe
            </button>
          </form>
        )}
        <Link
          title='Subscribe via RSS'
          href='/feeds/rss.xml'
          className={cx(styles.button, styles.icon, styles.rss)}
        >
          <RssIcon strokeWidth={2} />
        </Link>
      </div>
      <p className={typography.finePrint}>
        I’ll be flattered if you subscribe. You’ll only receieve updates when I
        (infrequently) publish. One-click to unsubscribe, zero hard feelings.
      </p>
    </div>
  );
}
