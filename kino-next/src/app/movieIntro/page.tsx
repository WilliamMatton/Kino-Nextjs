import ReviewContainer from "@/components/movieIntro/ReviewContainer";

import "@/styles/movieIntro.scss"
import cmsAdapter from "@/cmsAdapter";

export default async function Page() {
  const movieId = 8;
  const movie = await cmsAdapter.fetchMovie(movieId);
  const rating = await cmsAdapter.fetchRating(String(movieId));
  const imageUrl = movie?.attributes?.image?.url || "";
  const title = movie?.attributes?.title || "Film";
  const intro = movie?.attributes?.intro || "Ingen beskrivning finns tillgänglig.";

  return(
    <main className="movieIntro">
      <section className="movieIntro__media">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="movieIntro__image"
          />
        )}
        <p className="movieIntro__rating">
          Rating: {rating !== null ? `${rating.toFixed(1)} / 5` : "Saknas"}
        </p>
      </section>

      <section className="movieIntro__content">
        <h1>{title}</h1>
        <p>{intro}</p>
      </section>
    </main>
  );
}
