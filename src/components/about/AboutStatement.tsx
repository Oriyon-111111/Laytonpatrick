import { aboutContent } from "@/content/site";

import styles from "./AboutStatement.module.css";

export function AboutStatement() {
  return (
    <section className={styles.section} id="about" aria-labelledby="about-heading">
      <div className="siteContainer">
        <div className={styles.rule} aria-hidden="true" />
        <div className={styles.grid}>
          <div>
            <p className="microLabel">About</p>
            <h2 className={styles.heading} id="about-heading">
              {aboutContent.statement.heading}
            </h2>
          </div>
          <p className={styles.body}>{aboutContent.statement.body}</p>
        </div>
      </div>
    </section>
  );
}
