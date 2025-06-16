import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  as?: 'section' | 'div' | 'article'
  padding?: 'none' | 'sm' | 'default' | 'lg' | 'xl'
}

const paddingSizes = {
  none: '',
  sm: 'py-8 md:py-12',
  default: 'py-12 md:py-16 lg:py-20',
  lg: 'py-16 md:py-20 lg:py-24',
  xl: 'py-20 md:py-24 lg:py-32',
}

export default function Section({
  children,
  className,
  id,
  as: Component = 'section',
  padding = 'default',
}: SectionProps) {
  return (
    <Component
      id={id}
      className={cn(
        paddingSizes[padding],
        className
      )}
    >
      {children}
    </Component>
  )
}