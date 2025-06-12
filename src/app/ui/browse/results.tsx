import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/ui/browse.module.css';
import { fetchFilteredItems } from '@/app/lib/data';
import StarRating from './star';

export default async function ResultsTable({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}) {

	let items = [];

	try {
    items = await fetchFilteredItems(query, currentPage);
  } catch (error) {
    console.error("Error fetching filtered items:", error);
    return <p>Failed to load results.</p>;
  }

	return (
		<div className={`${styles['results-container']}`}>
			{items?.map((item) => (
				<div key={item.id} className={`${styles['results-item']}`}>
					{/* This link path may need to be adjusted */}
					<div className={styles['results-image-wrapper']}>
						<Link href={`/products/${item.id}`}>
							<Image
								className={styles['results-image']}
								src={`/images/${item.image_name}`}
								width={600}
								height={600}
								alt={`${item.title} product image`}
							/>
						</Link>
					</div>
					<div className={`${styles['results-details']}`}>
						<div className={`${styles['results-title-seller']}`}>
							<h2>{item.title}</h2>
							{/* This link path may need to be adjusted */}
							<Link href={`/sellers/${item.seller_id}`}>
								<p>
									{item.first_name} {item.last_name}
								</p>
							</Link>
						</div>
						<p>{item.description}</p>
						<div className={`${styles['results-price-rating']}`}>
							<p>${item.price}</p>
							<p>
								{item.average_rating !== 0 && (
									<>
										<StarRating
											rating={Number(item.average_rating)}
											maxStars={5}
										/>
									</>
								)}
							</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
