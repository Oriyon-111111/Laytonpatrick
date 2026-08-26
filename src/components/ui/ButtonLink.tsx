import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./ButtonLink.module.css";

type ButtonLinkProps = {
  children: ReactNode;
  href: string;
  variant?: "filled" | "text";
};

export function ButtonLink({ children, href, variant = "filled" }: ButtonLinkProps) {
  return (
    <Link className={`${styles.link} ${styles[variant]}`} href={href}>
      <span>{children}</span>
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </Link>
  );
}
