'use client'

import { useState } from 'react'
import MovieCard from './MovieCard'
import { useInfiniteScrollObserver } from '@/lib/useInfiniteScrollObserver'
import './MovieGrid.css'

export default function InfiniteMovieGrid({ initialMovies, initialPage, totalPages, mode, query }) {
  const [movies, setMovies] = useState(initialMovies)
  const [page, setPage] = useState(initialPage)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const hasMore = page < totalPages

  async function handleLoadMore() {
    setIsLoadingMore(true)

    try {
      const url =
        mode === 'search'
          ? `/api/search?query=${encodeURIComponent(query)}&page=${page + 1}`
          : `/api/popular?page=${page + 1}`

      const response = await fetch(url)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Could not load more movies.')
      }

      setMovies((current) => {
        const existingIds = new Set(current.map((movie) => movie.id))
        const newMovies = data.movies.filter((movie) => !existingIds.has(movie.id))
        return [...current, ...newMovies]
      })
      setPage(data.page)
    } catch (error) {
      console.warn('Could not load more movies:', error)
    } finally {
      setIsLoadingMore(false)
    }
  }

  const sentinelRef = useInfiniteScrollObserver({
    onIntersect: handleLoadMore,
    enabled: hasMore && !isLoadingMore,
  })

  return (
    <>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div ref={sentinelRef} className="scroll-sentinel" aria-hidden="true" />

      {isLoadingMore && (
        <div className="grid-status">
          <span className="mini-spinner" />
          <span>Loading more movies…</span>
        </div>
      )}

      {!hasMore && movies.length > 0 && (
        <p className="grid-status grid-status-end">No more movies to explore.</p>
      )}
    </>
  )
}
