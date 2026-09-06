import InfiniteMovieGrid from '@/components/InfiniteMovieGrid'
import ErrorMessage from '@/components/ErrorMessage'
import { getPopularMovies } from '@/lib/tmdb'

export const metadata = {
  title: 'Popular Movies',
}

export default async function MoviesPage() {
  let initialData = { movies: [], page: 1, totalPages: 0 }
  let fetchError = null

  try {
    initialData = await getPopularMovies(1)
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

  return (
    <div className="container page-section">
      <h2 className="section-heading">Browse popular movies</h2>
      <InfiniteMovieGrid
        initialMovies={initialData.movies}
        initialPage={initialData.page}
        totalPages={initialData.totalPages}
        mode="popular"
      />
    </div>
  )
}
