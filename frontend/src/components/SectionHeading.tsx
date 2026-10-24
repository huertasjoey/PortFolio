import { RichText } from './RichText'

interface Props {
  number: string
  label: string
  id?: string
  /** Heading text; **bold** words are supported. */
  title: string
  description?: string
}

/** Mono "NN — LABEL" eyebrow, light display heading (wrap keywords in <strong>), optional blurb. */
export function SectionHeading({ number, label, id, title, description }: Props) {
  return (
    <header className="mb-10 md:mb-14">
      <p className="mb-4 font-mono text-xs tracking-[0.2em] text-accent">
        {number} — {label.toUpperCase()}
      </p>
      <h2 className="text-4xl leading-[1.05] font-light tracking-tight text-fg sm:text-5xl lg:text-6xl [&_strong]:font-bold">
        <span id={id}>
          <RichText text={title} />
        </span>
      </h2>
      {description && <p className="mt-5 max-w-xl text-base leading-relaxed text-fg2">{description}</p>}
    </header>
  )
}
