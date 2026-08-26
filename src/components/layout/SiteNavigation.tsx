"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { site } from "@/content/site";

import styles from "./SiteHeader.module.css";

export function SiteNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation">
      <ul className={styles.navigation}>
        {site.navigation.map((item) => {
          const isCurrent =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <li key={item.href}>
              <Link
                className={styles.navigationLink}
                href={item.href}
                aria-current={isCurrent ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
