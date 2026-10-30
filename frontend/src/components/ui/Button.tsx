import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-medium transition duration-200 disabled:cursor-not-allowed disabled:opacity-50'
const variants = {
  primary: 'bg-fg text-bg hover:opacity-80',
  secondary: 'border border-line text-fg hover:border-fg',
  ghost: '!px-0 text-fg2 hover:text-fg',
}

type Variant = keyof typeof variants

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}

export function ButtonLink({
  variant = 'primary',
  className = '',
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; children: ReactNode }) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  )
}
