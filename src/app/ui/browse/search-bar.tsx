import SearchResults from "@/app/ui/browse/search-results";
import styles from "@/app/ui/browse/browse.module.css";

export default function SearchBar() {
  return (
    <>
      <div>
        <form className={`${styles["search-bar"]}`}>
          <label htmlFor="search-bar">
            <input type="text" placeholder="Search for items" />
          </label>
        </form>
      </div>
      <div className="search-results">
        <SearchResults />
      </div>
    </>
  );
}
