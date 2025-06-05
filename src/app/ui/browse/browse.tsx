import SearchBar from "./search-bar";
import styles from "@/app/ui/browse/browse.module.css";

export default function Catalog() {
  return (
    <>
      <div className={styles.catalogPage}>
        <h1>Catalog Search</h1>
        <SearchBar />
        <div>
          <p>Search results will be displayed here.</p>
        </div>
      </div>
    </>
  );
}
