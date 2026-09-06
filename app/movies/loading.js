import SkeletonGrid from '@/components/SkeletonGrid'

export default function Loading() {
  return (
    <div className="container page-section">
      <h2 className="section-heading">Browse popular movies</h2>
      <SkeletonGrid />
    </div>
  )
}
