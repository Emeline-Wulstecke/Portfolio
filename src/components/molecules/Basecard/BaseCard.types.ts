export interface ProjectCardProps {
  project: {
    id: number
    image: string
    alt: string
    category: string
    name: string
  }
  onCardClick?: () => void
}
