import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { navigate } from '../hooks/usePath'

/**
 * <a> that switches pages without a reload. Links to another page (e.g. /work, or /#skills from /work)
 * go through navigate(); same-page #hash links and modified clicks keep the browser's default behaviour.
 */
export function Link({ href = '/', onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const url = new URL(href, window.location.href)
    if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return
    e.preventDefault()
    navigate(url.pathname + url.hash)
  }
  return <a href={href} onClick={handle} {...props} />
}
