import cx from "classnames";
import { Resume, Position } from "src/providers/sanity/schema";
import Page from "src/components/page";
import styles from "./resume.module.css";
import typography from "src/styles/typography.module.css";

export type PositionProps = Position;

const Position = (props) => {
  const { role, company, description, startDate, endDate } = props;
  return (
    <section className={cx(styles.entry, styles.position)}>
      <aside className={cx(styles.when, typography.data)}>
        <p>
          <span className={cx(typography.keepTogether)}>{startDate}</span>
          {startDate && endDate && <> &ndash; </>}
          <span className={cx(typography.keepTogether)}>{endDate}</span>
        </p>
      </aside>
      <div className={cx(styles.entryBody)}>
        <header className={cx(typography.data)}>
          <div>
            <h3 className={cx(styles.role)}>{role}</h3>
            <p className={cx(styles.company, typography.data)}>
              {company.name}
            </p>
          </div>
        </header>
        <p className={cx(styles.description)}>{description}</p>
      </div>
    </section>
  );
};

const Education = (props) => {
  const { institution, degree, classYear } = props;
  return (
    <div className={cx(styles.entry, styles.education)}>
      <aside className={cx(styles.when, typography.data)}>
        <p>Class of {classYear}</p>
      </aside>
      <div className={cx(styles.entryBody)}>
        <header className={cx(typography.data)}>
          <div>
            <h3>{institution}</h3>
            {degree && <p>{degree}</p>}
          </div>
        </header>
        {props.children && (
          <div className={cx(styles.description)}>{props.children}</div>
        )}
      </div>
    </div>
  );
};

export type ResumeProps = Resume;

const Resume = (props) => {
  const { history, skills } = props;
  return (
    <article className={cx(styles.resume)}>
      <section>
        <h2>Employment History</h2>
        {history.map((position, index) => (
          <Position key={index} {...position} />
        ))}
      </section>
      <section>
        <h2>Education</h2>
        <Education
          institution='Boston University'
          degree='Bachelor of Arts, Computer Science and American Studies'
          classYear={2014}
        >
          <p>
            Published in{" "}
            <i>New Errands: The Undergraduate Journal of American Studies</i>
          </p>
          <p>Organized screenings as Vice President of the BU Film Society</p>
          <p>
            Wrote stories and designed for the <em>The Quad</em>, an independent
            online student magazine
          </p>
        </Education>
        <Education
          institution='Hunterdon Central Regional High School'
          classYear={2010}
        >
          <p>Recieved the English Department distinguished student award</p>
          <p>
            Design and layout for our student newspaper, <em>The Lamp</em>
          </p>
        </Education>
      </section>
      <section>
        <h2>Skills</h2>
        <ul className={cx(styles.skills, typography.data)}>
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default Resume;
