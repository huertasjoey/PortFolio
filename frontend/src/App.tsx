import { MotionConfig } from 'motion/react'
import { useEffect } from 'react'
import { Footer } from './components/Footer'
import { MobileNavigation } from './components/MobileNavigation'
import { Sidebar } from './components/Sidebar'
import { content } from './content'
import { useActiveSection } from './hooks/useActiveSection'
import { usePath } from './hooks/usePath'
import { useTheme } from './hooks/useTheme'
import { WorkPage } from './pages/WorkPage'
import { AboutSection } from './sections/AboutSection'
import { ContactSection } from './sections/ContactSection'
import { EducationSection } from './sections/EducationSection'
import { ExperienceSection } from './sections/ExperienceSection'
import { SkillsSection } from './sections/SkillsSection'
import { WorkSection } from './sections/WorkSection'

const homeTitle = document.title

export default function App() {
  const path = usePath()
  const onWorkPage = path === '/work'
  const activeSection = useActiveSection(path)
  const active = onWorkPage ? 'work' : activeSection
  const { theme, toggle } = useTheme()

  // On page change: jump to the #section if the link had one, otherwise start at the top.
  useEffect(() => {
    document.title = onWorkPage ? `${content.workPage.title} — ${content.profile.name}` : homeTitle
    const target = window.location.hash && document.querySelector(window.location.hash)
    if (target) target.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [path, onWorkPage])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only z-[60] rounded-md bg-accent px-4 py-2 text-accent-fg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Sidebar active={active} theme={theme} onToggleTheme={toggle} />
      <MobileNavigation active={active} theme={theme} onToggleTheme={toggle} />
      <main id="main" className="relative z-10 px-4 pt-16 sm:px-8 lg:ml-[245px] lg:px-12 lg:pt-0">
        <div className="mx-auto max-w-[1260px]">
          {onWorkPage ? (
            <WorkPage />
          ) : (
            <>
              <AboutSection />
              <WorkSection />
              <ExperienceSection />
              <SkillsSection />
              <EducationSection />
              <ContactSection />
            </>
          )}
          <Footer />
        </div>
      </main>
    </MotionConfig>
  )
}
