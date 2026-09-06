'use client'

import { AlertTriangle } from 'lucide-react'

export default function GlobalError({ error, reset }) {
  return (
    <div className="container page-section">
      <div className="error-message">
        <AlertTriangle size={22} strokeWidth={1.75} />
        <h3>Something went wrong</h3>
        <p>{error.message}</p>
        <button type="button" onClick={() => reset()} className="hero-button hero-button-primary">
          Try again
        </button>
      </div>
    </div>
  )
}
