import styles from "./ContactIntro.module.css";

export function ContactIntro() {
  return (
    <section className={styles.section} aria-labelledby="contact-heading">
      <div className="siteContainer">
        <h1 className={styles.heading} id="contact-heading">
          Contact.
        </h1>
      </div>
    </section>
  );
}
