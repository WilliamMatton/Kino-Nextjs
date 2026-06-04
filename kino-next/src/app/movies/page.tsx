/* page for all movies */

import MoviesList from "@/components/movies/MoviesList";
import "@/styles/movies.scss";

export default function MoviesPage() {
  return (
      <main>

            <h1 className="moviesHeading">Proxima B // Filmindex</h1>

        <MoviesList />

      </main>
  );
}


