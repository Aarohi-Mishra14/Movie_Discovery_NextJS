'use client'

import { Heart } from 'lucide-react'
import { useFavorites } from '@/lib/useFavorites'
import MovieCard from './MovieCard'
import EmptyState from './EmptyState'
import MovieGrid from './MovieGrid'

export default function FavoritesGrid() {
  const { favorites, hasLoaded } = useFavorites()

  if (!hasLoaded) return null

  if (favorites.length === 0) {
    return (
      <EmptyState
        icon={<Heart size={20} strokeWidth={1.75} />}
        title="Your watchlist is waiting"
        message="Movies you favorite will show up here so you can find them again later."
      />
    )
  }

  return <MovieGrid movies={favorites} />
}
