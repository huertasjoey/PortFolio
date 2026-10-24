import { useEffect, useState } from 'react'
import { content } from '../content'
import type { SectionId } from '../types'

/** Tracks which section crosses the middle band of the viewport. */
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>('about')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    for (const { id } of content.nav) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return active
}
