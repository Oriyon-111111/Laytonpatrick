import Image from "next/image";
import Link from "next/link";

import { SiteNavigation } from "./SiteNavigation";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className="siteContainer">
        <div className={styles.inner}>
          <Link className={styles.logoLink} href="/" aria-label="Layton Patrick home">
            <Image
              className={styles.logo}
              src="/images/brand/layton-patrick-logo.svg"
              width={900}
              height={300}
              priority
              alt="Layton Patrick"
            />
          </Link>
          <SiteNavigation />
        </div>
        <div className={styles.rule} aria-hidden="true" />
      </div>
    </header>
  );
}
