export default function Loading() {
  return (
    <div>
      <div style={{ height: '340px', background: 'var(--color-surface)' }} />
      <div className="container" style={{ marginTop: '-120px', position: 'relative', paddingBottom: '64px' }}>
        <div
          style={{
            width: '220px',
            aspectRatio: '2 / 3',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-surface-hover)',
          }}
        />
      </div>
    </div>
  )
}
