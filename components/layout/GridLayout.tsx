import { cn } from '@/lib/utils'

interface GridLayoutProps {
  children: React.ReactNode
  className?: string
  columns?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: 'none' | 'sm' | 'default' | 'lg' | 'xl'
}

const gapSizes = {
  none: 'gap-0',
  sm: 'gap-2 sm:gap-3 md:gap-4',
  default: 'gap-4 sm:gap-6 md:gap-8',
  lg: 'gap-6 sm:gap-8 md:gap-10',
  xl: 'gap-8 sm:gap-10 md:gap-12',
}

export default function GridLayout({
  children,
  className,
  columns = { default: 1, sm: 2, md: 3, lg: 4 },
  gap = 'default',
}: GridLayoutProps) {
  const gridCols = cn(
    'grid',
    columns.default && `grid-cols-${columns.default}`,
    columns.sm && `sm:grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    columns.xl && `xl:grid-cols-${columns.xl}`,
  )

  return (
    <div
      className={cn(
        gridCols,
        gapSizes[gap],
        className
      )}
    >
      {children}
    </div>
  )
}

// Version avec classes Tailwind statiques pour éviter la purge CSS
export function GalleryGrid({
  children,
  className,
  gap = 'default',
}: Omit<GridLayoutProps, 'columns'>) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
        gapSizes[gap],
        className
      )}
    >
      {children}
    </div>
  )
}

export function EventGrid({
  children,
  className,
  gap = 'default',
}: Omit<GridLayoutProps, 'columns'>) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        gapSizes[gap],
        className
      )}
    >
      {children}
    </div>
  )
}

export function TrackGrid({
  children,
  className,
  gap = 'default',
}: Omit<GridLayoutProps, 'columns'>) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        gapSizes[gap],
        className
      )}
    >
      {children}
    </div>
  )
}