import cmsAdapter from "@/cmsAdapter";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const movieId = searchParams.get("movieId");

    if (!movieId) {
        return Response.json(
            { error: "Missing movieId parameter" },
            { status: 400 });
    }

    const screenings = await cmsAdapter.fetchFirstFiveScreenings(movieId);
    return Response.json(screenings, { status: 200 })
  }
  catch(error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
