import Link from 'next/link'
import { Film } from 'lucide-react'
import EmptyState from '@/components/EmptyState'

export const metadata = {
  title: 'Movie not found',
}

export default function MovieNotFound() {
  return (
    <div className="container page-section">
      <EmptyState
        icon={<Film size={20} strokeWidth={1.75} />}
        title="Movie not found"
        message="We couldn't find a movie with that id. It may have been removed from TMDB."
      />
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <Link href="/" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
          Back to Discover
        </Link>
      </div>
    </div>
  )
}
