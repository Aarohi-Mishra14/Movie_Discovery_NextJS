import { Sparkles } from 'lucide-react'
import EmptyState from '@/components/EmptyState'
import MoodForm from '@/components/MoodForm'
import { isMoodMatcherAvailable } from '@/lib/gemini'

export const metadata = {
  title: 'Mood Matcher',
}

export default function MoodMatcherPage() {
  if (!isMoodMatcherAvailable()) {
    return (
      <div className="container page-section">
        <EmptyState
          icon={<Sparkles size={20} strokeWidth={1.75} />}
          title="Mood Matcher isn't configured"
          message="Add GEMINI_API_KEY to your .env.local file to enable this feature."
        />
      </div>
    )
  }

  return (
    <div className="container">
      <MoodForm />
    </div>
  )
}
