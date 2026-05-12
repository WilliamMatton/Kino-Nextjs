// Fil för alla funktioner som hämtar data från Richards CMS.
// Används så att vi slipper göra manuella fetches till CMS-länken
// nedan i alla våra egna API-routes.

const MOVIE_API = 'https://plankton-app-xhkom.ondigitalocean.app/api';

async function getMovie(movieID : number) {
  const res = await fetch(MOVIE_API + '/movies/' + movieID);
  const payload = await res.json();
  return payload.data;
}

const cmsAdapter = {
  getMovie
}

export default cmsAdapter;