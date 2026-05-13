import { review } from "./types";

const API = 'https://plankton-app-xhkom.ondigitalocean.app/api';

async function getReviews(movieID: number, page: number) {
  const res = await fetch(`${API}/reviews?filters[movie]=${movieID}&pagination[pageSize]=5&pagination[page]=${page}&sort=createdAt:desc`);
  const reviewBatch = await res.json();
  return reviewBatch;
}

async function postReview(review: review) {
  const res = await fetch(`${API}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        author: review.author,
        rating: review.rating,
        comment: review.comment,
        movie: review.movieID
      }
    })
  });

  const payload = await res.json();
  return payload;
}

const cmsAdapter = {
  getReviews,
  postReview
};

export default cmsAdapter;