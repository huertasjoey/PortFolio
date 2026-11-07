/** Opens a project's case study from anywhere on the home page (WorkSection listens for this). */
export const OPEN_CASE_STUDY = 'open-case-study'

export function openCaseStudy(projectId: string) {
  window.dispatchEvent(new CustomEvent<string>(OPEN_CASE_STUDY, { detail: projectId }))
}
