/* code for each movie card */

"use client";

import { useRouter } from "next/navigation";

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

type MovieCardProps = {
  movie: ApiMovie;
};

export default function MovieCard({ movie }: MovieCardProps) {

  const router = useRouter();
  const attrs = movie.attributes || {};
  const imageUrl = attrs.image?.url || "";
  const title = attrs.title || "Titel saknas";
  const intro = attrs.intro || "";

  function handleClick() {

    router.push(`/movieIntro/${movie.id}`);

  }

  return (
<article
  className="movieCard"
  onClick={handleClick}
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  }}
>
      {imageUrl && (
        <img src={imageUrl} alt={`Image for ${title}`} className="imageCard" />
      )}

      <div className="movieInfoContainer">
        <h3 className="cardTitle">{title}</h3>
        {intro && <p className="cardInfo">{intro}</p>}
      </div>

    </article>
  );
}





