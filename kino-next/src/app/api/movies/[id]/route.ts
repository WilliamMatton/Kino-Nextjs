import { NextResponse } from "next/server";
import apiAdapter from "@/cmsAdapter";

export async function GET(request: Request, { params }: { params: Promise<{ id: Number }> }) {
  try {
    const { id: movieID } = await params;
    const movie = await apiAdapter.getMovie(movieID);
    return NextResponse.json(movie, { status: 200 });
  }
  catch(error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}