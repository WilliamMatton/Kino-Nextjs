import { FC } from "react";

import { type movie } from "@/types";

type Props = {
  movieData: movie;
}

const MovieDetails : FC<Props> = ({ movieData }) => {
  return(
    <article className="movie-intro">
      <h1 className="movieTitle">{movieData.attributes.title}</h1>
      <img className="movieImg" src={movieData.attributes.image.url} alt={movieData.attributes.title} />
      <p className="movieIntro">{movieData.attributes.intro}</p>
    </article>
  );
}

export default MovieDetails;