/** Skill groups. No ratings are shown on purpose — edit the lists freely. */
export interface SkillGroup {
  title: string
  icon: 'code' | 'database' | 'cpu' | 'brain'
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  { title: 'Frontend Development', icon: 'code', items: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'] },
  { title: 'Backend & Data', icon: 'database', items: ['Supabase', 'Database fundamentals', 'REST APIs'] },
  {
    title: 'Computer Engineering',
    icon: 'cpu',
    items: ['Embedded Systems', 'Microcontrollers', 'Sensors', 'Circuit Design', 'IoT'],
  },
  {
    title: 'AI & Continuous Learning',
    icon: 'brain',
    // Keep "Python" only if it is part of your actual skill set.
    items: ['Python', 'AI Engineering fundamentals', 'Automation'],
  },
]
