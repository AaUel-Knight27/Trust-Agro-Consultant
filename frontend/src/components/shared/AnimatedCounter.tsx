'use client'
import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  value: string   // e.g. "500+" or "3+"
  duration?: number
}

export function AnimatedCounter({ value, duration = 1500 }: AnimatedCounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!isInView) return
    const numeric = parseInt(value.replace(/\D/g, ''))
    const suffix = value.replace(/[0-9]/g, '')
    if (isNaN(numeric)) {
      setDisplay(value)
      return
    }
    let start = 0
    const step = numeric / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= numeric) {
        setDisplay(`${numeric}${suffix}`)
        clearInterval(timer)
      } else {
        setDisplay(`${Math.floor(start)}${suffix}`)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, value, duration])

  return <span ref={ref}>{display}</span>
}
