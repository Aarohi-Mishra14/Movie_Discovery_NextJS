import { SearchX } from 'lucide-react'
import InfiniteMovieGrid from '@/components/InfiniteMovieGrid'
import EmptyState from '@/components/EmptyState'
import ErrorMessage from '@/components/ErrorMessage'
import { searchMovies } from '@/lib/tmdb'

export async function generateMetadata({ searchParams }) {
  const { query } = await searchParams
  return {
    title: query ? `Results for "${query}"` : 'Search',
  }
}

export default async function SearchPage({ searchParams }) {
  const { query } = await searchParams
  const trimmedQuery = (query || '').trim()

  if (!trimmedQuery) {
    return (
      <div className="container page-section">
        <EmptyState
          icon={<SearchX size={20} strokeWidth={1.75} />}
          title="Search for a movie"
          message="Type something into the search bar above to get started."
        />
      </div>
    )
  }

  let movies = []
  let totalPages = 0
  let fetchError = null

  try {
    const data = await searchMovies(trimmedQuery, 1)
    movies = data.movies
    totalPages = data.totalPages
  } catch (error) {
    fetchError = error.message
  }

  return (
    <div className="container page-section">
      <h2 className="section-heading">Results for &quot;{trimmedQuery}&quot;</h2>

      {fetchError ? (
        <ErrorMessage message={fetchError} />
      ) : movies.length === 0 ? (
        <EmptyState
          icon={<SearchX size={20} strokeWidth={1.75} />}
          title="No movies found"
          message={`We couldn't find anything matching "${trimmedQuery}". Try a different title.`}
        />
      ) : (
        <InfiniteMovieGrid
          initialMovies={movies}
          initialPage={1}
          totalPages={totalPages}
          mode="search"
          query={trimmedQuery}
        />
      )}
    </div>
  )
}
