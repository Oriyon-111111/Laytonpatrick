import { contactContent, site } from "@/content/site";

import styles from "./ContactDetails.module.css";

export function ContactDetails() {
  return (
    <div className={styles.details}>
      <div className={styles.group}>
        <p className="microLabel">General Enquiries</p>
        <a className={styles.email} href={`mailto:${site.email}`}>
          {site.email}
        </a>
      </div>

      <div className={styles.group}>
        <p className="microLabel">Location</p>
        <div className={styles.location}>
          {site.location.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>

      <p className={styles.profileNote}>{contactContent.profileNote}</p>
    </div>
  );
}
