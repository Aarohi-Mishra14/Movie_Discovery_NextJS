import Hero from '@/components/Hero'
import InfiniteMovieGrid from '@/components/InfiniteMovieGrid'
import ErrorMessage from '@/components/ErrorMessage'
import { getPopularMovies } from '@/lib/tmdb'

export default async function HomePage() {
  let movies = []
  let totalPages = 0
  let fetchError = null

  try {
    const data = await getPopularMovies(1)
    movies = data.movies
    totalPages = data.totalPages
  } catch (error) {
    fetchError = error.message
  }

  if (fetchError) {
    return (
      <div className="container page-section">
        <ErrorMessage message={fetchError} />
      </div>
    )
  }

  const heroMovie = movies[0] || null

  return (
    <>
      <Hero movie={heroMovie} />
      <div className="container page-section">
        <h2 className="section-heading">Popular movies</h2>
        <InfiniteMovieGrid initialMovies={movies} initialPage={1} totalPages={totalPages} mode="popular" />
      </div>
    </>
  )
}
