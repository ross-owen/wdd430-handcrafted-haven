"use client";
import { useState } from "react";

export default function ReviewForm() {
  const [rating, setRating] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form>
        <label htmlFor="reviewStars">
          Rating:
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star + "star"}
                onClick={() => setRating(star)}
                onMouseOver={() => setRating(star)}
                // onMouseLeave={() => setRating(0)}
                className={"star" + (rating >= star ? " filled" : "")}
              >
                ★
              </span>
            ))}
          </div>
        </label>
        <br />
        <label htmlFor="reviewText">
          Review Text:
          <textarea id="reviewText" name="reviewText"></textarea>
        </label>
      </form>
    </>
  );
}
