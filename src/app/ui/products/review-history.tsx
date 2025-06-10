import { Rating } from "@/app/lib/definitions";
import { starRating } from "@/app/lib/utils";

type ItemHistoryProps = {
  ratings: Rating[];
  className?: string;
};


export default function ReviewHistory({ ratings }: ItemHistoryProps) {
  return (
    <>
      <h2>Review History</h2>
      <div>
        <ul>
          {ratings.map((rating) => (
            <li key={rating.id}>
              hello {rating.name} rated this item{" "}
              <span>
                {starRating(rating.rating)} 
              </span>
              <p>{rating.review}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
