import Image from "next/image";
import type { Company } from "src/types/company";
import { srcFor } from "src/providers/sanity";
import styles from "./company.module.css";

export default function Company({ company }: { company: Company }) {
  const logoUrl = srcFor(company.logo).height(100).width(100).url();
  return (
    <div className={styles.company}>
      <Image
        className={styles.logo}
        alt={`${company.name} Logo`}
        src={logoUrl}
        height={32}
        width={32}
      />
      <p className={styles.name}>{company.name}</p>
    </div>
  );
}
