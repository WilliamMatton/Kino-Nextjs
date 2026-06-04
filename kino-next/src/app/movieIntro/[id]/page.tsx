import cmsAdapter from '@/cmsAdapter'
import ReviewContainer from '@/components/movieIntro/ReviewContainer'
import '@/styles/movieIntro.scss'

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
    <main className="movieIntro">
      <section className="movie-intro">
        {imageUrl ? <img src={imageUrl} alt={title} className="movieImg" /> : null}
        <div className="movieIntro">
          <h1 className="movieTitle">{title}</h1>
          <p>{attrs.description || ''}</p>
        </div>
      </section>

      <section>
        <ReviewContainer />
      </section>
    </main>
  )
}
