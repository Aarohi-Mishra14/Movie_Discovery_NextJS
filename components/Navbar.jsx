'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Clapperboard, Compass, Heart, Sparkles } from 'lucide-react'
import { useFavorites } from '@/lib/useFavorites'
import SearchBar from './SearchBar'
import './Navbar.css'

export default function Navbar({ moodMatcherAvailable }) {
  const pathname = usePathname()
  const { favorites } = useFavorites()

  return (
    <header className="app-header">
      <div className="container header-inner">
        <Link href="/" className="brand">
          <Clapperboard size={22} strokeWidth={2} />
          <span>CineReel</span>
        </Link>

        <Suspense fallback={<div className="search-bar-placeholder" />}>
          <SearchBar />
        </Suspense>

        <nav className="header-nav" aria-label="Primary">
          <Link href="/" className={pathname === '/' ? 'nav-item is-active' : 'nav-item'}>
            <Compass size={18} strokeWidth={2} />
            <span>Discover</span>
          </Link>

          {moodMatcherAvailable && (
            <Link
              href="/mood-matcher"
              className={pathname === '/mood-matcher' ? 'nav-item is-active' : 'nav-item'}
            >
              <Sparkles size={18} strokeWidth={2} />
              <span>Mood Matcher</span>
            </Link>
          )}

          <Link
            href="/favorites"
            className={pathname === '/favorites' ? 'nav-item is-active' : 'nav-item'}
          >
            <Heart size={18} strokeWidth={2} />
            <span>Favorites</span>
            {favorites.length > 0 && <span className="nav-count">{favorites.length}</span>}
          </Link>
        </nav>
      </div>
    </header>
  )
}
