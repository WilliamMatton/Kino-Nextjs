/* code for all movies to be rendered on movies page */

"use client";

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

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

export default function MoviesList() {

  const [movies, setMovies] = useState<ApiMovie[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          "https://plankton-app-xhkom.ondigitalocean.app/api/movies"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const apiData = await response.json();
        const moviesData = Array.isArray(apiData.data) ? apiData.data : [];

        setMovies(moviesData);

      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }

    fetchMovies();

  }, []);

  return (

    <section id="cardsContainer" className="cardsContainer">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>

  );
}






