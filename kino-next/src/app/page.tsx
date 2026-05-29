import Image from 'next/image'
import styles from '../styles/home.module.scss'
import Upcomingfilms from './Upcomingfilms'
import cmsAdapter from '@/cmsAdapter'

async function getMoviesWithRecentReviewCounts() {
  const movies = await cmsAdapter.fetchMovies();
  const fromDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const results = [];
  for (const m of movies) {
    const movieId = m.id ?? m.attributes?.id;
    if (!movieId) continue;
    let page = 1;
    let count = 0;
    while (true) {
      const batch = await cmsAdapter.fetchReviews(Number(movieId), page);
      const data = batch?.data ?? [];
      if (!data.length) break;
      let allOlder = true;
      for (const r of data) {
        const created = r.attributes?.createdAt ?? r.attributes?.created_at ?? r.attributes?.created;
        if (!created) continue;
        const d = new Date(created);
        if (isNaN(d.getTime())) continue;
        if (d >= fromDate) {
          allOlder = false;
          count++;
        }
      }
      if (allOlder) break;
      page++;
    }
    results.push({ movie: m, count });
  }
  results.sort((a, b) => b.count - a.count);
  return results;
}

export default async function Home() {
  const list = await getMoviesWithRecentReviewCounts();
  return (
    <main className={styles.wrapper}>
      <section className={styles.hero}>
        <h1>Populära filmer</h1>
        <div className={styles.grid}>
          {list.map(({ movie, count }) => {
            const attrs = movie.attributes || {};
            const title = attrs.title || attrs.name || 'Untitled';
            const imageUrl = attrs.image?.url || attrs.image?.data?.attributes?.url || '';
            return (
              <article key={movie.id} className={styles.card}>
                {imageUrl ? <img src={imageUrl} alt={title} className={styles.image} /> : null}
                <div className={styles.content}>
                  <h3>{title}</h3>
                  <p>Recensioner senaste 30 dagar: {count}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className={styles.upcoming}>
        <Upcomingfilms />
      </section>

      <section className={styles.upcoming}>
        <h2>Filmer med flest recensioner (30 dagar)</h2>
        <div className={styles.grid}>
          {list.map(({ movie, count }) => {
            const attrs = movie.attributes || {};
            const title = attrs.title || attrs.name || 'Untitled';
            const imageUrl = attrs.image?.url || attrs.image?.data?.attributes?.url || '';
            return (
              <article key={movie.id} className={styles.card}>
                {imageUrl ? <img src={imageUrl} alt={title} className={styles.image} /> : null}
                <div className={styles.content}>
                  <h3>{title}</h3>
                  <p>Recensioner senaste 30 dagar: {count}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
