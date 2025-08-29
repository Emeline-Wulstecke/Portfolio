export interface ProjectCardProps {
  project: {
    image: string
    alt: string
    category: string
    name: string
  }
  onCardClick?: () => void
}
