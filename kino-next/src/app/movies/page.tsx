/* page for all movies */

/* depending on what components to use   v */
/* import Navbar from "@/components/Navbar"; */
import MoviesList from "@/components/movies/MoviesList";
import "@/styles/movies.scss"

export default function MoviesPage() {
  return (
      <main>

        <div className="logoGlow">
          <img
            src="/images/Proxima-B.gif"
            alt="Proxima Cinema Logo"
            className="logoImg"
          />
          </div>

            <h1>Every single movie</h1>

        <MoviesList />

      </main>
  );
}


