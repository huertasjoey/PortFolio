import { ArrowDown, Mail } from 'lucide-react'
import { RichText } from '../components/RichText'
import { ButtonLink } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { ZoomableImage } from '../components/ZoomableImage'
import { content } from '../content'

const { about } = content

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="flex min-h-svh flex-col justify-center py-24 lg:py-28">
      <div className={`grid items-center gap-12 ${about.photo.src ? 'xl:grid-cols-[1fr_340px]' : ''}`}>
        <div>
          <Reveal>
            <p className="mb-6 font-mono text-xs tracking-[0.2em] text-accent">01 — ABOUT</p>
            <h1
              id="about-title"
              className="max-w-4xl text-4xl leading-[1.08] font-light tracking-tight text-fg sm:text-5xl lg:text-6xl 2xl:text-7xl [&_strong]:font-bold"
            >
              <RichText text={about.headline} />
            </h1>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div className="max-w-2xl space-y-5 text-base leading-relaxed text-fg2 sm:text-lg">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div>
              <h2 className="mb-4 font-mono text-xs tracking-[0.18em] text-muted uppercase">{about.focusTitle}</h2>
              <ul className="space-y-2">
                {about.focusAreas.map((a) => (
                  <li key={a} className="flex items-center gap-3 border-b border-line pb-2 text-sm text-fg2">
                    <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="#work">
              {about.primaryButton} <ArrowDown size={16} />
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary">
              <Mail size={16} /> {about.secondaryButton}
            </ButtonLink>
          </Reveal>
        </div>

        {about.photo.src && (
          <Reveal delay={0.15} className="mx-auto w-full max-w-[340px] xl:max-w-none">
            <figure className="theme-fade overflow-hidden rounded-[20px] border border-line bg-card">
              <div className="dot-grid p-3">
                <ZoomableImage
                  src={about.photo.src}
                  alt={about.photo.alt}
                  caption={about.photo.caption}
                  className="w-full overflow-hidden rounded-[14px]"
                  imgClassName="aspect-[2/3] w-full object-cover"
                />
              </div>
              {about.photo.caption && (
                <figcaption className="border-t border-line px-4 py-3 font-mono text-[11px] tracking-wider text-muted">
                  {about.photo.caption}
                </figcaption>
              )}
            </figure>
          </Reveal>
        )}
      </div>
    </section>
  )
}
