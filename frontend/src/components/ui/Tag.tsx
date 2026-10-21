export function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-line px-3 py-1 font-mono text-xs text-fg2 transition hover:border-accent hover:text-accent">
      {children}
    </span>
  )
}
