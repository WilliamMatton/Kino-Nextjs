/* page for all movies */

/* depending on what components to use   v */
/* import Navbar from "@/components/Navbar"; */
import MoviesList from "@/components/movies/MoviesList";
import "@/styles/movies.scss"

export default function MoviesPage() {
  return (
      <main>

            <h1>Proxima B // Filmindex</h1>

        <MoviesList />

      </main>
  );
}


