import { HTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'genre'
  size?: 'sm' | 'md'
  children: React.ReactNode
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', className, children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center font-medium rounded-full transition-colors'
    
    const variants = {
      default: 'bg-gray-800 text-gray-300 border border-gray-700',
      success: 'bg-green-900/50 text-green-400 border border-green-800',
      warning: 'bg-yellow-900/50 text-yellow-400 border border-yellow-800',
      error: 'bg-red-900/50 text-red-400 border border-red-800',
      genre: 'bg-gradient-to-r from-red-600/20 to-red-500/20 text-red-400 border border-orange-600/30'
    }
    
    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm'
    }
    
    return (
      <span
        ref={ref}
        className={clsx(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge