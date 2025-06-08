
import { fetchItemsPages } from '@/app/lib/data';
import ResultsTable from '@/app/ui/browse/results';

export default async function Page(props: {
	searchParams?: Promise<{
		query?: string;
		page?: string;
	}>;
}) {
	const searchParams = await props.searchParams;
	const query = searchParams?.query || '';
	const currentPage = Number(searchParams?.page) || 1;
	const totalPages = await fetchItemsPages(query);
	return (
		<main>
			<ResultsTable query={query} currentPage={currentPage} />
		</main>
	);

}
