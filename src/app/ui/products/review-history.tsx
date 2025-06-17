import { Rating } from "@/app/lib/definitions";
import StarRating from "@/app/ui/star";

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
        <ul>
          {ratings.map((rating) => (
            <li key={rating.id}>
              <div>
                <span>
                  <h3>Name: {rating.name || "Anonymous"}</h3>
                </span>
                <StarRating rating={Number(rating.rating)}></StarRating>
                
                <p>{rating.review}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
