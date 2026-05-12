import { NextRequest, NextResponse } from "next/server";
import apiAdapter from "@/cmsAdapter";

export async function GET() {
  try {
    const movies = await apiAdapter.getMovies();
    return NextResponse.json(movies, { status: 200 });
  }
  catch(error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}