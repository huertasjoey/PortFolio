import { ArrowDown, Mail } from 'lucide-react'
import { RichText } from '../components/RichText'
import { ButtonLink } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { ZoomableImage } from '../components/ZoomableImage'
import { content } from '../content'

const { about } = content

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="flex min-h-svh flex-col justify-center py-28 lg:py-36">
      <div className={`grid items-center gap-12 ${about.photo.src ? 'xl:grid-cols-[1fr_300px]' : ''}`}>
        <div>
          <Reveal>
            <p className="mb-8 font-mono text-[11px] tracking-[0.2em] text-muted">01 — ABOUT</p>
            <h1
              id="about-title"
              className="max-w-4xl text-4xl leading-[1.1] font-light tracking-tight text-fg sm:text-5xl lg:text-6xl [&_strong]:font-medium"
            >
              <RichText text={about.headline} />
            </h1>
          </Reveal>

          <Reveal delay={0.1} className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div className="max-w-2xl space-y-5 text-base leading-relaxed text-fg2 sm:text-lg">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div>
              <h2 className="mb-4 font-mono text-[11px] tracking-[0.18em] text-muted uppercase">{about.focusTitle}</h2>
              <ul>
                {about.focusAreas.map((a) => (
                  <li key={a} className="border-t border-line py-3 text-sm text-fg2 last:border-b">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-14 flex flex-wrap items-center gap-3">
            <ButtonLink href="#work">
              {about.primaryButton} <ArrowDown size={16} />
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost" className="px-3">
              <Mail size={16} /> {about.secondaryButton}
            </ButtonLink>
          </Reveal>
        </div>

        {about.photo.src && (
          <Reveal delay={0.15} className="mx-auto w-full max-w-[300px] xl:max-w-none">
            <figure>
              <ZoomableImage
                src={about.photo.src}
                alt={about.photo.alt}
                caption={about.photo.caption}
                className="w-full overflow-hidden rounded-md"
                imgClassName="aspect-[2/3] w-full object-cover"
              />
              {about.photo.caption && (
                <figcaption className="mt-3 font-mono text-[11px] tracking-wider text-muted">{about.photo.caption}</figcaption>
              )}
            </figure>
          </Reveal>
        )}
      </div>
    </section>
  )
}
