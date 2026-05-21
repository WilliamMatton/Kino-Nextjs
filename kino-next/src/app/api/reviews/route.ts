import { NextRequest, NextResponse } from "next/server";
import cmsAdapter from "@/cmsAdapter";

export async function POST(req: NextRequest) {
  try {
    const review = await req.json();
    const res = await cmsAdapter.postReview(review);
    return NextResponse.json(res, { status: 201 });
  }
  catch(error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message}, { status: 500 });
  }
}

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