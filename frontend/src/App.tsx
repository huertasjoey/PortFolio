import { MotionConfig } from 'motion/react'
import { Footer } from './components/Footer'
import { MobileNavigation } from './components/MobileNavigation'
import { Sidebar } from './components/Sidebar'
import { useActiveSection } from './hooks/useActiveSection'
import { useTheme } from './hooks/useTheme'
import { AboutSection } from './sections/AboutSection'
import { ContactSection } from './sections/ContactSection'
import { EducationSection } from './sections/EducationSection'
import { ExperienceSection } from './sections/ExperienceSection'
import { SkillsSection } from './sections/SkillsSection'
import { WorkSection } from './sections/WorkSection'

export default function App() {
  const active = useActiveSection()
  const { theme, toggle } = useTheme()

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only z-[60] rounded-lg bg-accent px-4 py-2 text-accent-fg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Sidebar active={active} theme={theme} onToggleTheme={toggle} />
      <MobileNavigation active={active} theme={theme} onToggleTheme={toggle} />
      <main id="main" className="px-4 pt-16 sm:px-8 lg:ml-[245px] lg:px-12 lg:pt-0">
        <div className="mx-auto max-w-[1260px]">
          <AboutSection />
          <WorkSection />
          <ExperienceSection />
          <SkillsSection />
          <EducationSection />
          <ContactSection />
          <Footer />
        </div>
      </main>
    </MotionConfig>
  )
}
