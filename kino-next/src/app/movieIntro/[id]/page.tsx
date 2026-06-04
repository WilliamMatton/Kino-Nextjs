import cmsAdapter from '@/cmsAdapter'
import ReviewContainer from '@/components/movieIntro/ReviewContainer'
import styles from '@/styles/movieIntro.module.scss'

type Props = {
  params: { id: string }
}

export default async function MoviePage({ params }: Props) {
  const id = Number(params.id)
  let movie = null

  try {
    movie = await cmsAdapter.fetchMovie(id)
  } catch (e) {
    movie = null
  }

  const attrs = movie?.attributes || {}
  const title = attrs.title || attrs.name || 'Untitled'
  const imageUrl = attrs.image?.url || attrs.image?.data?.attributes?.url || ''

  return (
    <main className={styles.movieIntroPage}>
      <section className={styles.movieHeader}>
        {imageUrl ? <img src={imageUrl} alt={title} className={styles.moviePoster} /> : null}
        <div className={styles.movieMeta}>
          <h1>{title}</h1>
          <p>{attrs.description || ''}</p>
        </div>
      </section>

      <section>
        <ReviewContainer />
      </section>
    </main>
  )
}
