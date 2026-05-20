import { NextRequest, NextResponse } from "next/server";
const REVIEWS_API = 'https://plankton-app-xhkom.ondigitalocean.app/api/reviews';

export async function getReviewRating(id: string) {
  const response = await fetch(`${REVIEWS_API}?movieId=${id}}`);
  const { data } = await response.json();
  if (data.length < 5) {
    return null;
  }
  const sum = data.reduce(
    (total: number, review: any) => total + review.attributes.rating,
    0
  );

  return sum / data.length;
}