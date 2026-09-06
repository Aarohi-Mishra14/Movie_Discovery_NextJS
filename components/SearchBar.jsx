'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { debounce } from '@/lib/debounce'
import './SearchBar.css'

const DEBOUNCE_DELAY = 500

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [inputValue, setInputValue] = useState(searchParams.get('query') || '')

  const navigateToSearch = useMemo(
    () =>
      debounce((value) => {
        if (value) {
          router.push(`/search?query=${encodeURIComponent(value)}`)
        } else {
          router.push('/')
        }
      }, DEBOUNCE_DELAY),
    [router]
  )

  useEffect(() => () => navigateToSearch.cancel(), [navigateToSearch])

  function handleChange(event) {
    const value = event.target.value
    setInputValue(value)
    navigateToSearch(value.trim())
  }

  function handleClear() {
    setInputValue('')
    navigateToSearch.cancel()
    router.push('/')
  }

  return (
    <div className="search-bar">
      <Search size={18} strokeWidth={2} className="search-icon" />
      <label htmlFor="movie-search" className="visually-hidden">
        Search for a movie
      </label>
      <input
        id="movie-search"
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search for a movie…"
        autoComplete="off"
      />
      {inputValue && (
        <button type="button" className="clear-button" onClick={handleClear} aria-label="Clear search">
          <X size={16} strokeWidth={2} />
        </button>
      )}
    </div>
  )
}
