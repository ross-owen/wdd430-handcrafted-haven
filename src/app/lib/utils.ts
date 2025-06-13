export function starRating (rating: number) {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push("<span>★</span>");
  }
  for (let i = rating; i < 5; i++) {
    stars.push("<span>☆</span>");
  }
  return stars.join("");
}