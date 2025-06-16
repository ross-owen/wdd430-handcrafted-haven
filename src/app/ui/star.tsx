// import React from "react";
"use client";
import { useState } from "react";
import styles from "@/app/ui/star.module.css";

export default function StarRating({
  rating,
  maxStars = 5,
  editPreview = false,
  onRatingChange,
}: {
  rating: number;
  maxStars?: number;
  editPreview?: boolean;
  onRatingChange?: (newRating: number) => void;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number>(rating);

  const displayRating =
    editPreview && hoveredIndex !== null
      ? hoveredIndex + 1
	        : selectedRating;
    //   : Math.round(rating);


	const handleClick = (i: number) => {
		if (editPreview) {
			const newRating = i + 1;
			setSelectedRating(newRating);
			onRatingChange?.(newRating);
		}
	}

  return (
	<>
    <span>
      {Array.from({ length: maxStars }, (_, i) => {
        const isFilled = i < displayRating;
        return (
          <span
            key={`star-${i}`}
            className={`${styles["star"]} ${
              isFilled ? styles["filled"] : styles["empty"]
            }`}
            onMouseEnter={() => editPreview && setHoveredIndex(i)}
            onMouseLeave={() => editPreview && setHoveredIndex(null)}
			onClick={() => handleClick(i)}
			style={{cursor: editPreview ? "pointer" : "default"}}
          >
            {isFilled ? "★" : "☆"}
          </span>
        );
      })}
    </span>
	 {editPreview && (<input type="hidden" name="rating" value={rating} />)}
	 </>
  );
}
