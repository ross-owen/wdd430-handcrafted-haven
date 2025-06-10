import styles from "@/app/ui/browse/browse.module.css";
import SearchBarFilter from "@/app/ui/browse/search-bar-filter";

export default function SearchBar({
  sellers,
  categories,
}: {
  sellers: Array<{ id: string; first_name: string; last_name: string }>;
  categories: Array<{ id: string; name: string; created: string; }>;
}) {
  return (
    <>
      <div>
        <form className={`${styles["search-bar"]}`}>
          <label htmlFor="search-bar">
            <input type="search" placeholder="Search for items" />
          </label>
          <div>
            <SearchBarFilter sellers={sellers} categories={categories} />
          </div>
        </form>
      </div>
    </>
  );
}
