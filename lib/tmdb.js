import dns from 'node:dns'
dns.setDefaultResultOrder('ipv4first')

const API_KEY = process.env.TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

async function tmdbFetch(endpoint, params = {}) {
  if (!API_KEY) {
    throw new Error(
      'Missing TMDB API key. Add TMDB_API_KEY to your .env.local file.'
    )
  }

  const url = new URL(`${BASE_URL}${endpoint}`)
  url.searchParams.set('api_key', API_KEY)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })

  const response = await fetch(url.toString(), { next: { revalidate: 3600 } })

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid TMDB API key. Double-check your .env.local file.')
    }
    if (response.status === 404) {
      return null
    }
    throw new Error(`TMDB request failed (status ${response.status}).`)
  }

  return response.json()
}

function normalizeMovie(raw) {
  return {
    id: raw.id,
    title: raw.title || raw.original_title || 'Untitled',
    overview: raw.overview || 'No description is available for this title yet.',
    posterPath: raw.poster_path || null,
    backdropPath: raw.backdrop_path || null,
    releaseYear: raw.release_date ? raw.release_date.slice(0, 4) : null,
    rating: typeof raw.vote_average === 'number' ? raw.vote_average : null,
  }
}

export async function getPopularMovies(page = 1) {
  const data = await tmdbFetch('/movie/popular', { page })
  return {
    movies: data.results.map(normalizeMovie),
    totalPages: data.total_pages,
    page: data.page,
  }
}

export async function searchMovies(query, page = 1) {
  if (!query) {
    return { movies: [], totalPages: 0, page: 1 }
  }
  const data = await tmdbFetch('/search/movie', { query, page })
  return {
    movies: data.results.map(normalizeMovie),
    totalPages: data.total_pages,
    page: data.page,
  }
}

export async function getMovieDetails(id) {
  const raw = await tmdbFetch(`/movie/${id}`)
  if (!raw) return null

  return {
    ...normalizeMovie(raw),
    runtime: raw.runtime || null,
    genres: Array.isArray(raw.genres) ? raw.genres.map((g) => g.name) : [],
    originalLanguage: raw.original_language || null,
    popularity: typeof raw.popularity === 'number' ? raw.popularity : null,
    tagline: raw.tagline || '',
  }
}
