'use client'
import { motion, useInView, Variants } from 'framer-motion'
import { useRef } from 'react'
import { fadeInUp } from '@/lib/animations'

interface AnimateOnScrollProps {
  children: React.ReactNode
  variants?: Variants
  className?: string
  delay?: number
}

export function AnimateOnScroll({ children, variants = fadeInUp, className, delay = 0 }: AnimateOnScrollProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        ...variants,
        visible: { 
          ...(variants.visible as object), 
          transition: { ...((variants.visible as { transition?: object })?.transition), delay } 
        }
      } as Variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
