import Image from "next/image";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { aboutContent } from "@/content/site";

import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="about-hero-heading">
      <div className={`siteContainer ${styles.grid}`}>
        <div className={styles.copy}>
          <h1 className={styles.heading} id="about-hero-heading">
            {aboutContent.headline.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className={styles.introduction}>{aboutContent.introduction}</p>
          <div className={styles.actions}>
            <ButtonLink href="#about">Company Profile</ButtonLink>
            <ButtonLink href="/contact" variant="text">
              Get in Touch
            </ButtonLink>
          </div>
        </div>

        <div className={styles.imageFrame}>
          <Image
            className={styles.image}
            src="/images/about/about-hero.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1199px) 52vw, 54vw"
          />
        </div>
      </div>
    </section>
  );
}
