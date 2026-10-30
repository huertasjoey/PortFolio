import { RichText } from './RichText'

interface Props {
  number: string
  label: string
  id?: string
  /** Heading text; **bold** words are supported. */
  title: string
  description?: string
}

/** Quiet mono "NN — LABEL" eyebrow, light heading (wrap keywords in <strong>), optional blurb. */
export function SectionHeading({ number, label, id, title, description }: Props) {
  return (
    <header className="mb-14 md:mb-20">
      <p className="mb-5 font-mono text-[11px] tracking-[0.2em] text-muted">
        {number} — {label.toUpperCase()}
      </p>
      <h2 className="text-3xl leading-[1.1] font-light tracking-tight text-fg sm:text-4xl lg:text-5xl [&_strong]:font-medium">
        <span id={id}>
          <RichText text={title} />
        </span>
      </h2>
      {description && <p className="mt-6 max-w-xl text-base leading-relaxed text-fg2">{description}</p>}
    </header>
  )
}
