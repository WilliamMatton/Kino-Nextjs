
import "@/styles/upcomingscreen.scss"
interface MovieScreening {
  id: number;
  attributes: {
    start_time: string;
    movie: {
      data: {
        attributes: {
          title: string;
          image?: {
             url: string;
                      };
        };
      };
    };
  };
}

async function getMovies(): Promise<MovieScreening[]> {
  const res = await fetch('http://localhost:3000/api/screenfilms', { cache: 'no-store' });
  if (!res.ok) throw new Error('Kunde inte ladda filmer');
  return res.json();
}

export default async function MoviesPage() {
  const screenings = await getMovies();

  return (
        <div className= "container">
      <h1 className= "title">Kommande visningar (5 dagar)</h1>
      <div className= "grid">
        {screenings.map((screening) => {
          const movie = screening.attributes.movie.data.attributes;
          const imageUrl = movie.image && movie.image.url ? movie.image.url : '';
          const startTime = new Date(screening.attributes.start_time).toLocaleDateString('sv-SE', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });

          return (
            <div key={screening.id} className= "card">
              <div className= "imageWrapper">
                <img src={imageUrl} alt={movie.title} className= "image" />
              </div>
              <div className= "content">
                <h2 className= "movieTitle">{movie.title}</h2>
                <p className= "time">{startTime}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
