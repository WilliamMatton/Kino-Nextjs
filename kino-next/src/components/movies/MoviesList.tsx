/* code for all movies to be rendered on movies page */

import MovieCard from "./MovieCard";

type ApiMovie = {
  id: number;
  attributes?: {
    title?: string;
    intro?: string;
    image?: {
      url?: string;
    };
  };
};

async function getMovies(): Promise<ApiMovie[]> {
  const response = await fetch(
    "https://plankton-app-xhkom.ondigitalocean.app/api/movies",
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Could not fetch movies");
  }

  const apiData = await response.json();
  return Array.isArray(apiData.data) ? apiData.data : [];
}

export default async function MoviesList() {
  const movies = await getMovies();

  return (
    <section id="cardsContainer" className="cardsContainer">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}






