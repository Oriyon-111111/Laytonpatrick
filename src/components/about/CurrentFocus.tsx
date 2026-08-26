import { aboutContent } from "@/content/site";

import styles from "./CurrentFocus.module.css";

export function CurrentFocus() {
  return (
    <section aria-labelledby="current-focus-heading">
      <div className="siteContainer">
        <div className={styles.rule} aria-hidden="true" />
        <div className={styles.content}>
          <p className="microLabel" id="current-focus-heading">
            Current Focus
          </p>
          <p className={styles.body}>{aboutContent.currentFocus}</p>
        </div>
      </div>
    </section>
  );
}
