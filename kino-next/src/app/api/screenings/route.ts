const SCREENINGS_API = 'https://plankton-app-xhkom.ondigitalocean.app/api/screenings';

export async function fetchFirstFiveScreenings(id: string) {
  const response = await fetch(`${SCREENINGS_API}?movieId=${id}`);

  const { data } = await response.json();

  const today = new Date();
  const upcomingScreenings = data.filter((screening: any) => {
    const screeningDate = new Date(screening.attributes.start_time);
    return screeningDate >= today;
  });
  return upcomingScreenings.slice(0, 5);
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const movieId = searchParams.get("movieId");

    if (!movieId) {
        return Response.json(
            { error: "Missing movieId parameter" },
            { status: 400 });
    }

    const screenings = await fetchFirstFiveScreenings(movieId);
  return Response.json(screenings)
}