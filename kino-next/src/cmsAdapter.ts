// Lägg alla funktioner som fetchar till Richards CMS här

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

export async function fetchRating(id: string) {
  const params = new URLSearchParams({
    'filters[movie]': id,
    'pagination[pageSize]': '100',
  });

  const response = await fetch(`${API}/reviews?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch ratings');
  }

  const { data } = await response.json();

  if (!data.length) {
    return null;
  }

  const sum = data.reduce(
    (total: number, review: any) => total + review.attributes.rating,
    0
  );

  return sum / data.length;
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
  fetchMovie,
  fetchReviews,
  postReview,
  fetchFirstFiveScreenings,
  fetchRating
};

export default cmsAdapter;
