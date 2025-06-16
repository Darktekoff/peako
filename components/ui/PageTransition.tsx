'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  }
}

const pageTransition = {
  type: 'tween',
  ease: [0.4, 0.0, 0.2, 1],
  duration: 0.4
}

export default function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Component pour wrapper les pages avec des transitions
export function PageWrapper({ children, className }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <PageTransition className={className}>
        {children}
      </PageTransition>
    </AnimatePresence>
  )
}