import { Fragment } from 'react'

/** Renders **double-asterisk** text as <strong>. Lets content.ts stay plain strings. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split('**').map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>))}
    </>
  )
}
