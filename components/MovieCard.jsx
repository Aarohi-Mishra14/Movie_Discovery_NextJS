'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Star, Film } from 'lucide-react'
import { getImageUrl } from '@/lib/tmdbImage'
import { useFavorites } from '@/lib/useFavorites'
import { useToast } from './ToastProvider'
import './MovieCard.css'

export default function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const { showToast } = useToast()
  const posterUrl = getImageUrl(movie.posterPath, 'w342')
  const favorite = isFavorite(movie.id)

  return (
    <article className="movie-card">
      <Link href={`/movie/${movie.id}`} className="movie-card-poster">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={`Poster for ${movie.title}`}
            width={342}
            height={513}
            sizes="(max-width: 720px) 45vw, 200px"
          />
        ) : (
          <div className="poster-fallback" role="img" aria-label={`No poster available for ${movie.title}`}>
            <Film size={32} strokeWidth={1.5} />
            <span>{movie.title}</span>
          </div>
        )}

        {movie.rating !== null && movie.rating > 0 && (
          <div className="rating-badge">
            <Star size={12} strokeWidth={0} fill="currentColor" />
            <span>{movie.rating.toFixed(1)}</span>
          </div>
        )}
      </Link>

      <button
        type="button"
        className={`favorite-button ${favorite ? 'is-favorite' : ''}`}
        onClick={(event) => {
          event.preventDefault()
          toggleFavorite(movie)
          showToast(favorite ? 'Removed from favorites' : 'Added to favorites')
        }}
        aria-label={favorite ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
        aria-pressed={favorite}
      >
        <Heart size={18} strokeWidth={2} fill={favorite ? 'currentColor' : 'none'} />
      </button>

      <div className="movie-card-info">
        <h3 title={movie.title}>
          <Link href={`/movie/${movie.id}`}>{movie.title}</Link>
        </h3>
        <span className="movie-year">{movie.releaseYear || 'Year unknown'}</span>
      </div>
    </article>
  )
}
