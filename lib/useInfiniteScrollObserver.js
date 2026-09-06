'use client'

import { useEffect, useRef } from 'react'

export function useInfiniteScrollObserver({ onIntersect, enabled }) {
  const sentinelRef = useRef(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !enabled) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect()
        }
      },
      { rootMargin: '250px' }
    )

    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [onIntersect, enabled])

  return sentinelRef
}
