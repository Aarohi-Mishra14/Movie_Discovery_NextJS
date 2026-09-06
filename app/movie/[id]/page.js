import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Star, Clock } from 'lucide-react'
import { getImageUrl } from '@/lib/tmdbImage'
import { getMovieDetails } from '@/lib/tmdb'
import './movie-details.css'

export async function generateMetadata({ params }) {
  const { id } = await params
  const movie = await getMovieDetails(id)

  if (!movie) {
    return { title: 'Movie not found' }
  }

  const description = movie.overview.slice(0, 155)

  return {
    title: movie.title,
    description,
    openGraph: {
      title: movie.title,
      description,
      images: movie.backdropPath ? [getImageUrl(movie.backdropPath, 'w1280')] : [],
    },
  }
}

export default async function MovieDetailsPage({ params }) {
  const { id } = await params
  const movie = await getMovieDetails(id)

  if (!movie) {
    notFound()
  }

  const backdropUrl = getImageUrl(movie.backdropPath, 'w1280')
  const posterUrl = getImageUrl(movie.posterPath, 'w500')

  return (
    <article>
      <div className="details-hero">
        {backdropUrl && (
          <Image src={backdropUrl} alt="" fill priority sizes="100vw" className="details-backdrop" />
        )}
        <div className="details-hero-overlay" />
      </div>

      <div className="container details-content">
        <div className="details-poster">
          {posterUrl ? (
            <Image src={posterUrl} alt={`Poster for ${movie.title}`} width={300} height={450} priority />
          ) : (
            <div className="details-poster-fallback">{movie.title}</div>
          )}
        </div>

        <div className="details-info">
          <h1>{movie.title}</h1>
          {movie.tagline && <p className="details-tagline">{movie.tagline}</p>}

          <div className="details-meta">
            {movie.rating !== null && movie.rating > 0 && (
              <span className="details-rating">
                <Star size={16} strokeWidth={0} fill="currentColor" />
                {movie.rating.toFixed(1)}
              </span>
            )}
            <span>{movie.releaseYear || 'Year unknown'}</span>
            {movie.runtime && (
              <span className="details-runtime">
                <Clock size={14} strokeWidth={2} />
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </span>
            )}
            {movie.originalLanguage && <span>{movie.originalLanguage.toUpperCase()}</span>}
          </div>

          {movie.genres.length > 0 && (
            <div className="details-genres">
              {movie.genres.map((genre) => (
                <span key={genre} className="genre-chip">
                  {genre}
                </span>
              ))}
            </div>
          )}

          <h2 className="details-overview-heading">Overview</h2>
          <p className="details-overview">{movie.overview}</p>
        </div>
      </div>
    </article>
  )
}
