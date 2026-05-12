// Fil där vi lägger funktioner som fetchar till vårt egna API
// som i sin tur fetchar från cmsAdapter.ts. Använd funktionerna i 
// denna fil i alla frontend (page.tsx) sidor som behöver vårt API 
// så vi slipper ha råa fetches där

const KINO_API = 'http://localhost:3000/api';

async function fetchMovie(movieID : number) {
  const movie = await fetch(`${KINO_API}/movies/${movieID}`);
  return movie;
}

const kinoApiAdapter = {
  fetchMovie
}

export default kinoApiAdapter;