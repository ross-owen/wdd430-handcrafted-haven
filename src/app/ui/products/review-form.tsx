"use client";
import { useState, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Item, Rating } from "@/app/lib/definitions";
import { createReview, ReviewState } from "@/app/lib/actions";
import styles from "@/app/ui/product.module.css";
import StarRating from "@/app/ui/star";

type ReviewFormProps = { ratings: Rating[]; item: Item };

export default function ReviewForm({ ratings, item }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const initialState: ReviewState = { errors: {}, message: "" };
  const [state, formAction] = useActionState<ReviewState, FormData>(
    createReview,
    initialState
  );
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (
      state.message &&
      state.errors &&
      Object.keys(state.errors).length === 0
    ) {
      setSubmitted(true);
      router.refresh();
    }
  }, [state]);
  if (submitted) {
    return <p>Thank you for submitting your review!</p>;
  }

  return (
    <>
      <form className={styles["ratings-form"]} action={formAction}>
        <fieldset>
          <legend>Submit a Review</legend>
          <label htmlFor="reviewStars">
            <div>
              Rating:
              <br />
              <StarRating
                rating={Number(rating)}
                editPreview={true}
                onRatingChange={(val) => setRating(val)}
              ></StarRating>
            </div>
          </label>
          <label htmlFor="reviewName">
            <div>Your Name:</div>
            <input
              type="text"
              id="reviewName"
              name="name"
              placeholder="Enter your name"
            />
          </label>

          <label htmlFor="reviewText">
            <div>Review:</div>
            <textarea id="reviewText" name="review"></textarea>
          </label>
          <input type="hidden" name="item_id" value={item.id} />

          <button type="submit">Submit Review</button>
        </fieldset>
      </form>
    </>
  );
}
