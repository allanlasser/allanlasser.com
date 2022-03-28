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

const Education = (props) => {
  const { institution, degree, classYear } = props;
  return (
    <div className={cx(styles.education)}>
      <header>
        <div>
          <h3>{institution}</h3>
          {degree && <p>{degree}</p>}
        </div>
        <p className={cx(styles.classYear)}>Class of {classYear}</p>
      </header>
      {props.children && (
        <div className={cx(styles.description)}>{props.children}</div>
      )}
    </div>
  );
};

export type ResumeProps = Resume;

const Resume = (props) => {
  const { history, skills } = props;
  return (
    <Page>
      <article className={cx(styles.resume)}>
        <header>
          <h1>Allan Lasser</h1>
          <p>Product Designer &amp; Web Developer</p>
        </header>
        <section>
          <h2>Employment History</h2>
          {history.map((position, index) => (
            <Position key={index} {...position} />
          ))}
        </section>
        <section>
          <h2>Skills</h2>
          <ul className={cx(styles.skills)}>
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
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
              Wrote stories and designed for the <em>The Quad</em>, an
              independent online student magazine
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
      </article>
    </Page>
  );
};

export default Resume;
