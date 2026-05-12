const MOVIE_API = 'https://plankton-app-xhkom.ondigitalocean.app/api';

async function getMovies() {
  const res = await fetch(MOVIE_API + '/movies');
  const payload = await res.json();
  return payload.data;
}

async function getMovie(id : Number) {
  const res = await fetch(MOVIE_API + '/movies/' + id);
  const payload = await res.json();
  return payload.data;
}

const apiAdapter = {
  getMovies,
  getMovie
}

export default apiAdapter;