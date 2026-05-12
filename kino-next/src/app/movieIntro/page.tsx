import kinoApiAdapter from "@/kinoApiAdapter";

import MovieDetails from "@/components/movieIntro/MovieDetails";

import "@/styles/movieIntro.scss";

export default async function Page({ searchParams }: { searchParams: Promise<{ id: number }> }) {
  const { id } = await searchParams;

  const res = await kinoApiAdapter.fetchMovie(id);
  const movie = await res.json();

  return(
    <MovieDetails movieData={movie} />
  );
}