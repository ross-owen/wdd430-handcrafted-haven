"use client";
import styles from "@/app/ui/browse/browse.module.css";
import SearchBarFilter from "@/app/ui/browse/search-bar-filter";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar({
  sellers,
  categories,
}: {
  sellers: Array<{ id: string; first_name: string; last_name: string }>;
  categories: Array<{ id: string; name: string; created: string }>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(e.target.name, e.target.value);
    params.delete("page");
    router.push(`/browse?${params.toString()}`);
  };

  return (
    <>
      <div>

          <label htmlFor="search-bar">
            <input
              type="search"
              placeholder="Search for items"
              onChange={handleChange}
              defaultValue={searchParams.get("query") || ""}
              name="query"
            />
          </label>
          <div>
            <SearchBarFilter
              sellers={sellers}
              categories={categories}
              handleChange={handleChange}
            />
          </div>

      </div>
    </>
  );
}
