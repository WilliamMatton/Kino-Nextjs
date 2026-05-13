import { NextResponse } from "next/server";
import cmsAdapter from "@/cmsAdapter";

export async function GET(request: Request, { params }: { params: Promise<{ id: number, page: number }> }) {
  try {
    const { id: movieID, page: currentPage } = await params;
    const reviews = await cmsAdapter.getReviews(movieID, currentPage);
    return NextResponse.json(reviews, { status: 200 });
  }
  catch(error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}