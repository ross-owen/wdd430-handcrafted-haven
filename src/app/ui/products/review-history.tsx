import { Rating } from "@/app/lib/definitions";
import StarRating from "@/app/ui/star";
import styles from '@/app/ui/products/review.module.css';

type ItemHistoryProps = {
  ratings: Rating[];
  className?: string;
};



export default function ReviewHistory({ ratings }: ItemHistoryProps) {
  console.log( "Rating History", ratings );
  return (
		<>
			<h2>Reviews</h2>
			<div>
				{ratings.map((rating) => (
					<div key={rating.id}>
						<div>
							<div className={`${styles['rating-name-stars']}`}>
								<span>
									<h3>{rating.name || 'Anonymous'}</h3>
								</span>
								<StarRating rating={Number(rating.rating)}></StarRating>
							</div>

							<p>{rating.review}</p>
						</div>
            <hr></hr>
					</div>
				))}
			</div>
		</>
	);
}
