'use client'

import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface AnimatedCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  variant?: 'default' | 'elevated' | 'outlined' | 'glass'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverEffect?: 'lift' | 'glow' | 'scale' | 'none'
  clickable?: boolean
  className?: string
}

export default function AnimatedCard({ 
  children, 
  variant = 'default',
  padding = 'md',
  hoverEffect = 'lift',
  clickable = false,
  className,
  ...props 
}: AnimatedCardProps) {
  const baseClasses = 'rounded-lg transition-all duration-200'
  
  const variants = {
    default: 'bg-gray-900 border border-gray-800',
    elevated: 'bg-gray-900 border border-gray-800 shadow-xl',
    outlined: 'bg-transparent border-2 border-gray-700',
    glass: 'bg-black/30 backdrop-blur-md border border-white/10'
  }
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  const hoverEffects = {
    lift: {
      whileHover: { y: -4, transition: { duration: 0.2 } },
      whileTap: clickable ? { scale: 0.98 } : {}
    },
    glow: {
      whileHover: { 
        boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)',
        transition: { duration: 0.2 }
      },
      whileTap: clickable ? { scale: 0.98 } : {}
    },
    scale: {
      whileHover: { scale: 1.02, transition: { duration: 0.2 } },
      whileTap: clickable ? { scale: 0.98 } : {}
    },
    none: {}
  }
  
  return (
    <motion.div
      className={clsx(
        baseClasses,
        variants[variant],
        paddings[padding],
        clickable && 'cursor-pointer',
        className
      )}
      {...hoverEffects[hoverEffect]}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Loading skeleton pour les cardes
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <motion.div 
      className={clsx('bg-gray-900 border border-gray-800 rounded-lg p-6', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-3"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2 mb-4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-700 rounded"></div>
          <div className="h-3 bg-gray-700 rounded w-5/6"></div>
        </div>
      </div>
    </motion.div>
  )
}