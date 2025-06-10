import styles from "@/app/ui/browse/browse.module.css";
import type { Category } from "@/app/lib/definitions";

export default function SearchBarFilter({
  sellers,
  categories,
}: {
  sellers: Array<{ id: string; first_name: string; last_name: string }>;
  categories: Category[];
}) {
  return (
    <>
      <div>
        <form className={`${styles["search-bar"]}`}>
          <label htmlFor="search-bar-filter-sellers">
            <select>
              <option>All sellers</option>
              {sellers.map((seller) => (
                <option key={seller.id} value={seller.id}>
                  {seller.first_name} {seller.last_name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="search-bar-filter-categories">
            <select>
              <option>All categories</option>
               {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="search-bar-filter-ratings">
            <select>
              <option value="0">No ratings selected</option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </label>
        </form>
      </div>
    </>
  );
}
