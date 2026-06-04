import type { Movie, Rating, Screening } from "@/types";

type MovieIntroDetailsProps = {
  movie: Movie | null;
  rating: Rating | null;
  screenings: Screening[];
};

function formatScreeningTime(startTime: string) {
  return new Intl.DateTimeFormat("sv-SE", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Stockholm",
  }).format(new Date(startTime));
}

export default function MovieIntroDetails({
  movie,
  rating,
  screenings,
}: MovieIntroDetailsProps) {
  const imageUrl = movie?.attributes?.image?.url || "";
  const title = movie?.attributes?.title || "Film";
  const intro =
    movie?.attributes?.intro || "Ingen beskrivning finns tillgänglig.";

  const ratingLabel = rating?.source === "imdb" ? "IMDB" : "Rating";
  const ratingScale = rating?.source === "imdb" ? 10 : 5;

  return (
    <main className="movieIntro">
      <section className="movieIntro__media">
        {imageUrl && (
          <img src={imageUrl} alt={title} className="movieIntro__image" />
        )}
        <p className="movieIntro__rating">
          {rating !== null
            ? `${ratingLabel}: ${rating.value.toFixed(1)} / ${ratingScale}`
            : "Rating: Saknas"}
        </p>
      </section>

      <section className="movieIntro__content">
        <h1>{title}</h1>
        <p>{intro}</p>

        <section className="movieIntro__screenings">
          <h2>Visningar</h2>
          {screenings.length > 0 ? (
            <ul>
              {screenings.map((screening) => (
                <li key={screening.id}>
                  {formatScreeningTime(screening.attributes.start_time)}
                </li>
              ))}
            </ul>
          ) : (
            <p>Inga kommande visningar.</p>
          )}
        </section>
      </section>
    </main>
  );
}
