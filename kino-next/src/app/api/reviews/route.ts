import { NextRequest, NextResponse } from "next/server";
const SCREENINGS_API = 'https://plankton-app-xhkom.ondigitalocean.app/api/screenings';

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