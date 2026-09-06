import './SkeletonGrid.css'

export default function SkeletonGrid({ count = 10 }) {
  return (
    <div className="skeleton-grid" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton-poster shimmer" />
          <div className="skeleton-line shimmer" style={{ width: '80%' }} />
          <div className="skeleton-line shimmer" style={{ width: '40%' }} />
        </div>
      ))}
    </div>
  )
}
