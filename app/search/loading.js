import SkeletonGrid from '@/components/SkeletonGrid'

export default function Loading() {
  return (
    <div className="container page-section">
      <h2 className="section-heading">Searching…</h2>
      <SkeletonGrid />
    </div>
  )
}
