import { useEffect, useState } from 'react'
import { content } from '../content'
import type { SectionId } from '../types'

/**
 * Which section is in view: the last one whose top has passed 40% of the viewport height.
 * Worked out from the scroll position on every scroll (not from intersection events), so fast
 * jumps can't leave it stale; at the very bottom of the page the last section always wins.
 * Re-reads the sections when `page` changes.
 */
export function useActiveSection(page: string): SectionId {
  const [active, setActive] = useState<SectionId>('about')

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const sections = content.nav
        .map(({ id }) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null)
      if (!sections.length) return

      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      const line = window.innerHeight * 0.4
      let current = sections[0]
      for (const el of sections) if (el.getBoundingClientRect().top <= line) current = el
      setActive((atBottom ? sections[sections.length - 1] : current).id as SectionId)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [page])

  return active
}
