"use client";
import { useState } from "react";

import { Rating } from "@/app/lib/definitions";
import styles from "@/app/ui/product.module.css";
import { starRating } from "@/app/lib/utils";

type ReviewFormProps = { ratings: Rating[] };

export default function ReviewForm({ ratings }: ReviewFormProps) {
  const [rating, setRating] = useState(0);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  // };

  return (
    <>
      <form className={styles["ratings-form"]}>
        <fieldset>
          <legend>Submit a Review</legend>
          {/* <label htmlFor="reviewTitle">
            Review Title:
            <input
              type="text"
              id="reviewTitle"
              name="reviewTitle"
              placeholder="Enter review title"
            />
          </label> */}
          <label htmlFor="reviewName">
            <div>Your Name:</div>
            <input
              type="text"
              id="reviewName"
              name="reviewName"
              placeholder="Enter your name"
            />
          </label>
          <label htmlFor="reviewStars">
            <div>Rating:</div>
            <div className={styles["star-rating"]}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star + "star"}
                  onClick={() => starRating(star)}
                  onMouseOver={() => starRating(star)}
                  // onMouseLeave={() => setRating(0)}
                  className={"star" + (rating >= star ? " filled" : "")}
                >
                  ★
                </span>
              ))}
            </div>
          </label>

          <label htmlFor="reviewText">
            <div>Review Text:</div>
            <textarea id="reviewText" name="reviewText"></textarea>
          </label>

          <button type="submit">Submit Review</button>
        </fieldset>
      </form>
    </>
  );
}
