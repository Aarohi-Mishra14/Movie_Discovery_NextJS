import Link from 'next/link'
import { Star, PlayCircle } from 'lucide-react'
import { getImageUrl } from '@/lib/tmdbImage'
import './Hero.css'

export default function Hero({ movie }) {
  if (!movie) return null

  const backdropUrl = getImageUrl(movie.backdropPath, 'w1280')

  return (
    <section
      className="hero"
      style={backdropUrl ? { backgroundImage: `url(${backdropUrl})` } : undefined}
    >
      <div className="hero-overlay" />
      <div className="container hero-content">
        <span className="hero-eyebrow">Popular right now</span>
        <h1>{movie.title}</h1>

        <div className="hero-meta">
          {movie.rating !== null && movie.rating > 0 && (
            <span className="hero-rating">
              <Star size={14} strokeWidth={0} fill="currentColor" />
              {movie.rating.toFixed(1)}
            </span>
          )}
          <span>{movie.releaseYear || 'Year unknown'}</span>
        </div>

        <p className="hero-overview">{movie.overview}</p>

        <div className="hero-actions">
          <Link
            className="hero-button hero-button-primary"
            href={`/movie/${movie.id}`}
          >
            <PlayCircle size={18} strokeWidth={2} />
            View details
          </Link>
        </div>
      </div>
    </section>
  )
}
