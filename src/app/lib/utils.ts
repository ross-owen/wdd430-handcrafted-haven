export function snakeToCamel<T>(obj: Record<string, string>): T {
  const newObj: Record<string, string> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      newObj[camelKey] = obj[key];
    }
  }
  return newObj as T;
}

export function starRating (rating: number) {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push("★");
  }
  for (let i = rating; i < 5; i++) {
    stars.push("☆");
  }
  return stars.join("");
}