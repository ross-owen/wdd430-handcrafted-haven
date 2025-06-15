import React from "react";
import styles from '@/app/ui/star.module.css';


export default function StarRating({ rating, maxStars = 5 }: {rating: number; maxStars?: number;}) {
	const filledCount = Math.round(rating);
	const emptyCount = maxStars - filledCount;

	return (
		<span>
			{Array.from({ length: filledCount }, (_, i) => (
				<span
					key={`star-filled-${i}`}
					className={`${styles['star']} ${styles['filled']}`}
				>
					★
				</span>
			))}
			{Array.from({ length: emptyCount }, (_, i) => (
				<span
					key={`star-empty-${i}`}
					className={`${styles['star']} ${styles['empty']}`}
				>
					☆
				</span>
			))}
		</span>
	);
}
