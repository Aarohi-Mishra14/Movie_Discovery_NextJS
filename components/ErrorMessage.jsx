'use client'

import { useRouter } from 'next/navigation'
import { AlertTriangle } from 'lucide-react'
import './ErrorMessage.css'

export default function ErrorMessage({ message, retryable = true }) {
  const router = useRouter()

  return (
    <div className="error-state" role="alert">
      <AlertTriangle size={28} strokeWidth={1.75} />
      <h3>Something went wrong</h3>
      <p>{message || 'We could not load movies right now. Please try again.'}</p>
      {retryable && (
        <button className="retry-button" onClick={() => router.refresh()}>
          Try again
        </button>
      )}
    </div>
  )
}
