import Image from 'next/image';
import { fetchFilteredItems } from '@/app/lib/data';

export default async function ResultsTable({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}) {
	const items = await fetchFilteredItems(query, currentPage);

	return (
		<div className="results-container">
			{items?.map((item) => (
				<div key={item.id} className="results-item">
					<Image
						src={`/images/${item.image_name}`}
						width={100}
						height={100}
						alt={`${item.title} product image`}
						className="results-image"
					/>
					<div className="results-details">
						<h2>{item.title}</h2>
						<p>${item.price}</p>
						<p>{item.description}</p>
						<p>
							<span>Seller:</span> {item.first_name} {item.last_name}
						</p>
						<p>
							<span>Category:</span> {item.category_name}
						</p>
						<p>
							<span>Average Rating:</span>{' '}
							{Number(item.average_rating).toFixed(1)}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}
