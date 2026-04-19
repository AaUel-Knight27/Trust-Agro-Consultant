'use client'
import Image from 'next/image'
import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CloudinaryImageProps {
  src: string | null | undefined
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  fallbackClassName?: string
  priority?: boolean
  sizes?: string
}

export function CloudinaryImage({
  src, alt, fill, width, height, className, fallbackClassName, priority, sizes
}: CloudinaryImageProps) {
  const [error, setError] = useState(false)

  if (!src || error) {
    return (
      <div className={cn('bg-zinc-100 flex items-center justify-center', fallbackClassName)}>
        <ImageOff size={32} className="text-zinc-300" />
      </div>
    )
  }

  const commonProps = {
    src,
    alt,
    className,
    priority,
    onError: () => setError(true),
    sizes: sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  }

  if (fill) {
    return <Image {...commonProps} alt={alt} fill />
  }

  return <Image {...commonProps} alt={alt} width={width || 800} height={height || 600} />
}
