import './EmptyState.css'

export default function EmptyState({ icon, title, message }) {
  return (
    <div className="empty-state">
      {icon && <div className="empty-state-icon">{icon}</div>}
      <h3>{title}</h3>
      {message && <p>{message}</p>}
    </div>
  )
}
