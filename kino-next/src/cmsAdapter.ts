// Lägg alla funktioner som fetchar till Richards CMS här
import type { Rating } from "./types";

const API = 'https://plankton-app-xhkom.ondigitalocean.app/api';

export async function fetchFirstFiveScreenings(id: string) {
  const now = new Date().toISOString();
  const params = new URLSearchParams({
    'filters[movie]': id,
    'filters[start_time][$gte]': now,
    sort: 'start_time:asc',
    'pagination[pageSize]': '5',
    populate: 'movie',
  });

  const response = await fetch(`${API}/screenings?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch screenings');
  }

  const { data } = await response.json();
  return data;
}

async function fetchMovies() {
  
  const res = await fetch(API + '/movies');

  if (!res.ok) {
    throw new Error('Failed to fetch movies');
  }

  const payload = await res.json();

  return Array.isArray(payload.data) ? payload.data : [];

}

async function fetchMovie(movieID : number) {
  const res = await fetch(API + '/movies/' + movieID);
  const payload = await res.json();
  return payload.data;
}

async function fetchReviews(movieID: number, page: number) {
  const res = await fetch(`${API}/reviews?filters[movie]=${movieID}&pagination[pageSize]=5&pagination[page]=${page}&sort=createdAt:desc`);
  const reviewBatch = await res.json();
  return reviewBatch;
}

async function fetchRating(id: string): Promise<Rating | null> {
  const res = await fetch(`${API}/reviews?filters[movie]=${id}&pagination[pageSize]=100`);
  const payload = await res.json();
  const reviews = Array.isArray(payload.data) ? payload.data : [];

  if (reviews.length >= 5) {
    const sum = reviews.reduce(
      (total: number, review: any) => total + review.attributes.rating,
      0
    );

    return {
      value: sum / reviews.length,
      source: "reviews",
    };
  }

  const omdbKey = process.env.OMDB_API_KEY;
  const movie = await fetchMovie(Number(id));
  const imdbID = movie?.attributes?.imdbId;

  if (!omdbKey || !imdbID) {
    return null;
  }

  const omdbRes = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${omdbKey}`);
  const omdbPayload = await omdbRes.json();
  const imdbRating = Number(omdbPayload.imdbRating);

  return Number.isNaN(imdbRating)
    ? null
    : {
        value: imdbRating,
        source: "imdb",
      };
}

async function postReview(review: { data: { author: string; rating: number; comment: string; movie: number } }) {
  const res = await fetch(`${API}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        author: review.data.author,
        rating: review.data.rating,
        comment: review.data.comment,
        movie: review.data.movie
      }
    })
  });

  const payload = await res.json();
  return payload;
}

const cmsAdapter = {
  fetchMovies, 
  fetchMovie,
  fetchReviews,
  postReview,
  fetchFirstFiveScreenings,
  fetchRating,
};

export default cmsAdapter;
