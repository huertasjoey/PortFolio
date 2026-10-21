/**
 * Experience entries. Leave `experience` EMPTY to show the
 * "independent work & continuous learning" fallback instead.
 * Example entry:
 *   { role: 'Intern', organization: 'Company', period: '2025', description: '…', tech: ['React'] }
 */
export interface ExperienceEntry {
  role: string
  organization: string
  period: string
  description: string
  tech: string[]
}

export const experience: ExperienceEntry[] = []

export const independentWork = [
  {
    title: 'Independent projects',
    text: 'Self-directed builds across embedded hardware, IoT and full-stack web — see the Work section.',
  },
  {
    title: 'Practical engineering',
    text: 'Applying computer engineering coursework to sensors, microcontrollers and circuit design.',
  },
  {
    title: 'Continuous learning',
    text: 'Growing in AI engineering, automation and modern web tooling.',
  },
]
