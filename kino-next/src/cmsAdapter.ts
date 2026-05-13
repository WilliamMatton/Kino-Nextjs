const API = 'https://plankton-app-xhkom.ondigitalocean.app/api';

async function getReviews(movieID: number, page: number) {
  const res = await fetch(`${API}/reviews?filters[movie]=${movieID}&pagination[pageSize]=5&pagination[page]=${page}&sort=createdAt:desc`);
  const reviewBatch = await res.json();
  return reviewBatch;
}

const cmsAdapter = {
  getReviews
};

export default cmsAdapter;