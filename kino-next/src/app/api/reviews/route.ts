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