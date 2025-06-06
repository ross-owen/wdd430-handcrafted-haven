import Image from 'next/image';
import { fetchFilteredItems } from '@/app/lib/data';
import styles from '@/app/ui/browse.module.css';
import StarRating from './star';
import Link from 'next/link';

export default async function ResultsTable({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}) {
	const items = await fetchFilteredItems(query, currentPage);

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
