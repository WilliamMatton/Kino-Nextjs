import { NextResponse } from "next/server";
import cmsAdapter from "@/cmsAdapter";

export async function GET(request: Request, { params }: { params: Promise<{ id: number }> }) {
  try {
    const { id: movieID } = await params;
    const url = new URL(request.url);
    const currentPage = url.searchParams.get('page') || '1';
    const reviews = await cmsAdapter.fetchReviews(movieID, Number(currentPage));
    return NextResponse.json(reviews, { status: 200 });
  }
  catch(error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}