// Lägg alla funktioner som fetchar till Richards CMS här

const API = 'https://plankton-app-xhkom.ondigitalocean.app/api';

async function fetchReviews(movieID: number, page: number) {
  const res = await fetch(`${API}/reviews?filters[movie]=${movieID}&pagination[pageSize]=5&pagination[page]=${page}&sort=createdAt:desc`);
  const reviewBatch = await res.json();
  return reviewBatch;
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
  fetchReviews,
  postReview
};

export default cmsAdapter;