
import {Rating} from "@/app/lib/definitions";

type ItemHistoryProps = {
  ratings: Rating[];
};

export default function ReviewHistory(
  {ratings}: ItemHistoryProps
) {
  return (
    <>
      <h2>Review History</h2>
      <div>
        <p>No reviews found.</p>
      </div>
    </>
  );
}
