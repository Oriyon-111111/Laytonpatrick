import { aboutContent } from "@/content/site";

import styles from "./ApproachGrid.module.css";

export function ApproachGrid() {
  return (
    <section aria-labelledby="approach-heading">
      <div className="siteContainer">
        <div className={styles.rule} aria-hidden="true" />
        <p className={`microLabel ${styles.label}`} id="approach-heading">
          Approach
        </p>
        <div className={styles.grid}>
          {aboutContent.approaches.map((approach) => (
            <article className={styles.item} key={approach.number}>
              <p className={styles.number}>{approach.number}</p>
              <h3 className={styles.heading}>{approach.heading}</h3>
              <p className={styles.body}>{approach.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
