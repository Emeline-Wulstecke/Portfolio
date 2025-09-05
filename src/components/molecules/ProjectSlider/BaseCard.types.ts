export interface Project {
  id: number
  name: string
  texte?: string
  title?: string
  objectif1?: string
  objectif2?: string
  objectif3?: string
  objectif4?: string
  image: string
  alt: string
  url?: string
  github?: string
  category: string
  problematiques: string[]
}

export interface ProjectCardProps {
  project: Project
  onCardClick?: () => void
}
