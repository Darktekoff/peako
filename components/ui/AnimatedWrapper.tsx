'use client'

import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedWrapperProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'none'
  delay?: number
  duration?: number
  className?: string
}

const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  },
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  },
  none: {
    initial: {},
    animate: {},
    exit: {}
  }
}

export default function AnimatedWrapper({ 
  children, 
  animation = 'fadeIn', 
  delay = 0, 
  duration = 0.5,
  className,
  ...props 
}: AnimatedWrapperProps) {
  const animationConfig = animations[animation]
  
  return (
    <motion.div
      initial={animationConfig.initial}
      animate={animationConfig.animate}
      exit={animationConfig.exit}
      transition={{ 
        duration, 
        delay,
        ease: [0.4, 0.0, 0.2, 1] // Custom easing for smooth animations
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Hook pour animations au scroll
export function useScrollAnimation() {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }
  }
}