import { Metadata } from "next";
import Browse from "@/app/ui/browse/browse";
import Catalog from "@/app/ui/browse/browse";
import styles from "@/app/ui/browse/browse.module.css";

export const metadata: Metadata = {
  title: "Catalog Search",
};

export default function itemDetails() {
  return (
    <main className={styles.catalogPage}>
      <Browse />
    </main>
  );
}
