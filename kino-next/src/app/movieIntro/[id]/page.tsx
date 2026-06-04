import ReviewContainer from "@/components/movieIntro/ReviewContainer";
import MovieIntroDetails from "@/components/movieIntro/MovieIntroDetails";
import cmsAdapter from "@/cmsAdapter";

import "@/styles/movieIntro.scss";

export default async function Page(props: {
  params: Promise<{ id: string; }>,
  searchParams?: Promise<{ page: string; }>
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const movieID = Number(params.id);
  const currentPage = Number(searchParams?.page) || 1;
  const [movie, rating, screenings] = await Promise.all([
    cmsAdapter.fetchMovie(movieID),
  cmsAdapter.fetchRating(String(movieID)),
  cmsAdapter.fetchFirstFiveScreenings(String(movieID)),
  ]);

    return (
      <>
        <MovieIntroDetails
          movie={movie}
          rating={rating}
          screenings={screenings}
        />
        <ReviewContainer movieID={movieID} page={currentPage} />
      </>
    );
}
