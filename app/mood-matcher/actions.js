'use server'

import { getMovieTitleForMood } from '@/lib/gemini'
import { searchMovies } from '@/lib/tmdb'

export async function findMovieForMood(previousState, formData) {
  const mood = (formData.get('mood') || '').toString().trim()

  if (!mood) {
    return { status: 'idle' }
  }

  try {
    const suggestedTitle = await getMovieTitleForMood(mood)
    const data = await searchMovies(suggestedTitle, 1)

    if (data.movies.length === 0) {
      return {
        status: 'error',
        message: `Gemini suggested "${suggestedTitle}", but TMDB has no matching title.`,
      }
    }

    return {
      status: 'done',
      suggestedTitle,
      movie: data.movies[0],
    }
  } catch (error) {
    return { status: 'error', message: error.message }
  }
}
