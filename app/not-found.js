import Link from 'next/link'
import { SearchX } from 'lucide-react'
import EmptyState from '@/components/EmptyState'

export const metadata = {
  title: 'Page not found',
}

export default function NotFound() {
  return (
    <div className="container page-section">
      <EmptyState
        icon={<SearchX size={20} strokeWidth={1.75} />}
        title="Page not found"
        message="The page you're looking for doesn't exist."
      />
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <Link href="/" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
          Back to Discover
        </Link>
      </div>
    </div>
  )
}
