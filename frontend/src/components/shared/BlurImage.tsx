'use client'
import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface BlurImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export function BlurImage({ src, alt, fill, width, height, className, priority, sizes }: BlurImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  const commonProps = {
    src,
    alt,
    priority,
    className: cn(
      'transition-all duration-500',
      isLoading ? 'scale-105 blur-sm' : 'scale-100 blur-0',
      className
    ),
    onLoad: () => setIsLoading(false),
    sizes: sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  }

  if (fill) return <Image {...commonProps} alt={alt} fill />
  return <Image {...commonProps} alt={alt} width={width || 800} height={height || 600} />
}
