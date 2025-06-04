import Image from 'next/image';
import { fetchFilteredItems } from '@/app/lib/data';

export default async function Results({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}) {
	const items = await fetchFilteredItems(query, currentPage);

	return (
		<div className="mt-6 flow-root">
			<div className="inline-block min-w-full align-middle">
				<div className="rounded-lg bg-gray-50 p-2 md:pt-0">
					<div className="md:hidden">
						{items?.map((item) => (
							<div
								key={item.id}
								className="mb-2 w-full rounded-md bg-white p-4"
							>
                            <p>{item.title}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
