/* code for each movie card */

"use client";

import Link from "next/link";

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
  const attrs = movie.attributes || {};
  const imageUrl = attrs.image?.url || "";
  const title = attrs.title || "Titel saknas";
  const intro = attrs.intro || "";

  return (
    <Link href={`/movieIntro/${movie.id}`} className="movieCard">
      {imageUrl && (
        <img src={imageUrl} alt={`Image for ${title}`} className="imageCard" />
      )}

      <div className="movieInfoContainer">
        <h3 className="cardTitle">{title}</h3>
        {intro && <p className="cardInfo">{intro}</p>}
      </div>
    </Link>
  );
}



