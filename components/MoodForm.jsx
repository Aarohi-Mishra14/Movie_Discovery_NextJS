'use client'

import { useActionState, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { findMovieForMood } from '@/app/mood-matcher/actions'
import MovieCard from './MovieCard'
import ErrorMessage from './ErrorMessage'
import EmptyState from './EmptyState'
import './MoodForm.css'

const initialState = { status: 'idle' }

export default function MoodForm() {
  const [state, formAction, isPending] = useActionState(findMovieForMood, initialState)
  const [mood, setMood] = useState('')

  return (
    <section className="mood-matcher">
      <div className="mood-intro">
        <Sparkles size={22} strokeWidth={1.75} />
        <h2>Mood Matcher</h2>
        <p>Describe what you&apos;re in the mood for, and Gemini will point you to one movie to try.</p>
      </div>

      <form className="mood-form" action={formAction}>
        <label htmlFor="mood-input" className="visually-hidden">
          Describe your mood
        </label>
        <input
          id="mood-input"
          name="mood"
          type="text"
          value={mood}
          onChange={(event) => setMood(event.target.value)}
          placeholder="e.g. something relaxing and emotional"
        />
        <button type="submit" disabled={isPending || !mood.trim()}>
          {isPending ? 'Thinking…' : 'Find a movie'}
        </button>
      </form>

      {state.status === 'error' && <ErrorMessage message={state.message} retryable={false} />}

      {state.status === 'done' && state.movie && (
        <div className="mood-result">
          <p className="mood-result-caption">
            Gemini suggested &ldquo;{state.suggestedTitle}&rdquo; — here&apos;s the closest TMDB match:
          </p>
          <div className="mood-result-card">
            <MovieCard movie={state.movie} />
          </div>
        </div>
      )}

      {state.status === 'idle' && (
        <EmptyState
          icon={<Sparkles size={20} strokeWidth={1.75} />}
          title="Tell us your mood"
          message="Try something like “a tense sci-fi thriller” or “a cozy feel-good comedy.”"
        />
      )}
    </section>
  )
}
