import { ContactDetails } from "./ContactDetails";
import { ContactForm } from "./ContactForm";
import styles from "./ContactBody.module.css";

export function ContactBody() {
  return (
    <section className={styles.section} aria-label="Contact information and enquiry form">
      <div className={`siteContainer ${styles.grid}`}>
        <ContactDetails />
        <div className={styles.formColumn}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
