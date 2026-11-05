import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { content } from '../content'
import type { Project } from '../types'

interface Props {
  projects: Project[]
  onOpen: (p: Project) => void
}

/**
 * Tile sizes on a 12-column grid, repeated if there are more projects than entries.
 * The first tile is the large feature; the rest alternate wide and narrow so the edges stay staggered.
 */
const layout = [
  'md:col-span-7 md:row-span-4',
  'md:col-span-5 md:row-span-2',
  'md:col-span-5 md:row-span-2',
  'md:col-span-5 md:row-span-3',
  'md:col-span-7 md:row-span-3',
]
/** On phones: two columns, with every third tile full width (and a last tile that would sit alone). */
const mobile = (i: number, count: number) =>
  i % 3 === 0 || (i === count - 1 && i % 3 === 1) ? 'col-span-2 aspect-[4/3]' : 'col-span-1 aspect-[3/4]'

/** Photo collage of project covers; each tile opens its case study. */
export function ProjectCollage({ projects, onOpen }: Props) {
  return (
    <ul className="grid grid-cols-2 gap-3 md:auto-rows-[7.5rem] md:grid-cols-12 md:gap-4 lg:auto-rows-[9rem]">
      {projects.map((p, i) => (
        <motion.li
          key={p.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: (i % 5) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className={`${mobile(i, projects.length)} md:aspect-auto ${layout[i % layout.length]}`}
        >
          <button
            type="button"
            onClick={() => onOpen(p)}
            aria-haspopup="dialog"
            aria-label={`${p.title}: ${content.projectUi.caseStudyButton}`}
            className="group relative block size-full overflow-hidden rounded-[2px] bg-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            {p.image && (
              <img
                src={p.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
            )}
            {/* Legibility wash for the caption; deepens on hover. */}
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
            />
            <span aria-hidden className="absolute inset-3 border border-white/0 transition-colors duration-500 group-hover:border-white/25 md:inset-4" />

            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 text-left text-white md:p-6">
              <span className="min-w-0">
                <span className="flex items-center gap-3 text-[10px] tracking-[0.3em] text-white/70 uppercase">
                  <span className="font-serif text-base tracking-normal text-[#e3c999] italic lining-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="hidden truncate sm:inline">{p.classification.split('·')[0].trim()}</span>
                </span>
                <span
                  className={`mt-1 block font-serif leading-[1.05] font-light ${i === 0 ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-2xl lg:text-3xl'}`}
                >
                  {p.title}
                </span>
                <span className="mt-0 flex max-h-0 items-center gap-2 overflow-hidden text-xs tracking-wide text-[#e3c999] opacity-0 transition-all duration-500 group-hover:mt-3 group-hover:max-h-6 group-hover:opacity-100 group-focus-visible:mt-3 group-focus-visible:max-h-6 group-focus-visible:opacity-100">
                  {content.projectUi.caseStudyButton} <ArrowRight size={13} />
                </span>
              </span>
            </span>
          </button>
        </motion.li>
      ))}
    </ul>
  )
}
