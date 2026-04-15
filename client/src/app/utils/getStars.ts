export function getStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
}