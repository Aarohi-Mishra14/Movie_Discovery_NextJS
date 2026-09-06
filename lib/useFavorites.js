'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'movieFavorites'

function loadFavoritesFromStorage() {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.warn('Could not read favorites from localStorage:', error)
    return []
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState([])
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    setFavorites(loadFavoritesFromStorage())
    setHasLoaded(true)
  }, [])

  useEffect(() => {
    if (!hasLoaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch (error) {
      console.warn('Could not save favorites to localStorage:', error)
    }
  }, [favorites, hasLoaded])

  function isFavorite(movieId) {
    return favorites.some((movie) => movie.id === movieId)
  }

  function toggleFavorite(movie) {
    setFavorites((current) => {
      if (current.some((existing) => existing.id === movie.id)) {
        return current.filter((existing) => existing.id !== movie.id)
      }
      return [...current, movie]
    })
  }

  return { favorites, isFavorite, toggleFavorite, hasLoaded }
}
