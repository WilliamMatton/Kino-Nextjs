import { NextRequest, NextResponse } from "next/server";
const SCREENINGS_API = 'https://plankton-app-xhkom.ondigitalocean.app/api/screenings';
const REVIEWS_API = 'https://plankton-app-xhkom.ondigitalocean.app/api/reviews';
// Test api route
export async function GET() {
  const reviews = [{
    review: "Bra film"
  }];
  return NextResponse.json(reviews, { status: 200 });
}

export async function getFirstFiveScreenings(id: string) {
  const response = await fetch(`${SCREENINGS_API}?movieId=${id}`);

  const { data } = await response.json();
  return data.slice(0, 5);
}
// ej säkert denna är korrekt
export async function getReviewRating(id: string, rating: number) {
  const response = await fetch(`${REVIEWS_API}?movieId=${id}&rating=${rating}`);
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