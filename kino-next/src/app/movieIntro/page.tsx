import "@/styles/movieIntro.scss"
import { fetchReviewRating } from "../api/reviews/route";
import { fetchFirstFiveScreenings } from "../api/screenings/route";

export default async function MovieIntro() {
  const screenings = await fetchFirstFiveScreenings("movieId");
  return(
    <><h1>Detaljsida</h1><div>
      <p>Movie rating: {await fetchReviewRating("movieId")}</p>
    </div>
    <div>
      <p>Kommande visningar:</p>
      { screenings.length === 0 ? (
        <p>Inga kommande visningar</p>
      ) :
        screenings.map((screening: any) => (
          <p key={screening.id}>
            {screening.attributes.start_time}
          </p>
        ))
      }
    </div>
  </>
  );
}