import Image from "next/image";
import Link from "next/link";

import { site } from "@/content/site";

import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="siteContainer">
        <div className={styles.rule} aria-hidden="true" />
        <div className={styles.inner}>
          <Link className={styles.logoLink} href="/" aria-label="Layton Patrick home">
            <Image
              className={styles.logo}
              src="/images/brand/layton-patrick-logo.svg"
              width={900}
              height={300}
              alt="Layton Patrick"
            />
          </Link>

          <div className={styles.contact}>
            <p className="microLabel">Contact</p>
            <a className={styles.email} href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>

          <div className={styles.location}>
            {site.location.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
