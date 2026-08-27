import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./ButtonLink.module.css";

type ButtonLinkProps = {
  children: ReactNode;
  href: string;
  variant?: "filled" | "text";
};

export function ButtonLink({ children, href, variant = "filled" }: ButtonLinkProps) {
  const className = `${styles.link} ${styles[variant]}`;
  const content = (
    <>
      <span>{children}</span>
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </>
  );

  if (href.startsWith("#")) {
    return (
      <a className={className} href={href}>
        {content}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {content}
    </Link>
  );
}
