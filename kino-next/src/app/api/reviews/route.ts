import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const reviews = [{
    review: "Bra film"
  }];
  return NextResponse.json(reviews, { status: 200 });
}