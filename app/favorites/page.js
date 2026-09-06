import FavoritesGrid from '@/components/FavoritesGrid'

export const metadata = {
  title: 'Your Favorites',
}

export default function FavoritesPage() {
  return (
    <div className="container page-section">
      <h2 className="section-heading">Your favorites</h2>
      <FavoritesGrid />
    </div>
  )
}
