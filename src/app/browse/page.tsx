import { fetchItemsPages, fetchSellers, fetchCategories } from "@/app/lib/data";
import ResultsTable from "@/app/ui/browse/results";
import SearchBar from "@/app/ui/browse/search-bar";
import { UUID } from 'crypto';
import { Suspense } from "react";


export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    seller?: string;
    category?: string;
    rating?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const seller_id = searchParams?.seller || '';
	const category_id = searchParams?.category || '';
	const rating = searchParams?.rating || '';

  const [totalPages, rawSellers, categories] = await Promise.all([
    fetchItemsPages(query),
    fetchSellers(),
    fetchCategories(),
  ]);

  const sellers = rawSellers.map(({ id, first_name, last_name }) => ({
    id,
    first_name,
    last_name,
  }));


  console.log("Search Parameters:", searchParams);
  console.log("Query:", query);
  console.log("Current Page:", currentPage);
  console.log("Total Pages:", totalPages);

  return (
		<main>
			<SearchBar sellers={sellers} categories={categories} />
			<Suspense>
				<ResultsTable
					query={query}
					seller_id={seller_id}
					category_id={category_id}
					rating={rating}
					currentPage={currentPage}
					random={false}
				/>
			</Suspense>
		</main>
	);
}
