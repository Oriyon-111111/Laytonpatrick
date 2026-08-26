import Image from "next/image";

import styles from "./ContactImage.module.css";

export function ContactImage() {
  return (
    <section className={styles.section} aria-label="Layton Patrick production image">
      <div className="siteContainer">
        <div className={styles.frame}>
          <Image
            className={styles.image}
            src="/images/contact/contact-studio.png"
            alt=""
            fill
            sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1199px) calc(100vw - 80px), 1312px"
          />
        </div>
      </div>
    </section>
  );
}
