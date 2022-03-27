import cx from "classnames";
import { Resume, Position } from "src/providers/sanity/schema";
import Page from "src/components/page";
import styles from "./resume.module.css";
import typography from "src/styles/typography.module.css";

export type PositionProps = Position;

const Position = (props) => {
  const { role, company, description, startDate, endDate } = props;
  return (
    <section className={cx(styles.position)}>
      <header>
        <div>
          <h3 className={cx(styles.role)}>{role}</h3>
          <p className={cx(styles.company)}>{company}</p>
        </div>
        <p className={cx(styles.date)}>
          {startDate}
          {startDate && endDate && <>&nbsp;&ndash;&nbsp;</>}
          {endDate}
        </p>
      </header>
      <p className={cx(styles.description)}>{description}</p>
    </section>
  );
};

export type ResumeProps = Resume;

const Resume = (props) => {
  const { history } = props;
  console.log(history);
  return (
    <Page>
      <article className={cx(styles.resume)}>
        <header>
          <h1>Allan Lasser</h1>
          <p>Product Design &amp; Web Development</p>
        </header>
        <h2>Employment History</h2>
        {history.map((position, index) => (
          <Position key={index} {...position} />
        ))}
      </article>
    </Page>
  );
};

export default Resume;
