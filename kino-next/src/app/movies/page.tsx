/* page for all movies */

/* depending on what components to use   v */
/* import Navbar from "@/components/Navbar"; */
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

            <h1>All movies shown</h1>
            <h2>standby. .</h2>

        <div id="cardsContainer"></div>

      </main>
  );
}


