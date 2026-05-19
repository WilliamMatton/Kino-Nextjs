import "@/styles/movieIntro.scss"
import { getFirstFiveScreenings, getReviewRating } from "../api/reviews/route";

export default async function MovieIntro() {
  const screenings = await getFirstFiveScreenings("movie-id");
  return(
    <><h1>Detaljsida</h1><div>
      <p>Movie rating: {getReviewRating("movie-id", 5)}</p>
    </div>
    <div>
      <p>Kommande visningar:</p>
      {
        screenings.map((screening: any) => (
          <p key={screening.id}>
            {screening.attribute.start_time}
          </p>
        ))
      }
    </div>
  </>
  );
}