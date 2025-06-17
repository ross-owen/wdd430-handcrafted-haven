import styles from "@/app/ui/browse/browse.module.css";
import type { Category } from "@/app/lib/definitions";

export default function SearchBarFilter({
  sellers,
  categories,
  handleChange,
}: {
  sellers: Array<{ id: string; first_name: string; last_name: string }>;
  categories: Category[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <>
      <div className={styles["dropdown-wrapper"]}>
        <label htmlFor="search-bar-filter-sellers">
          <select
            onChange={handleChange}
            name="seller"
            className={styles["filter-dropdown"]}
          >
            <option value={""}>All sellers</option>
            {sellers.map((seller) => (
              <option key={seller.id} value={seller.id}>
                {seller.first_name} {seller.last_name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="search-bar-filter-categories">
          <select
            onChange={handleChange}
            name="category"
            className={styles["filter-dropdown"]}
          >
            <option value={""}>All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="search-bar-filter-ratings">
          <select
            onChange={handleChange}
            name="rating"
            className={styles["filter-dropdown"]}
          >
            <option value="">No ratings selected</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </label>
        <label htmlFor="search-bar-filter-price">
          <select
            onChange={handleChange}
            name="price"
            className={styles["filter-dropdown"]}
          >
            <option value="">No price range selected</option>
            <option value="0-50">Under $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-500">$100 - $500</option>
            <option value="500+">Over $500</option>
          </select>
        </label>
      </div>
    </>
  );
}
