'use client'
import Image from 'next/image'
import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getSafeImageSrc, optimizeCloudinaryUrl } from '@/lib/imageUtils'

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
  optimize?: boolean
}

export function CloudinaryImage({
  src,
  alt,
  fill,
  width = 800,
  height = 600,
  className,
  fallbackClassName,
  priority,
  sizes,
  optimize = true,
}: CloudinaryImageProps) {
  const [error, setError] = useState(false)

  const safeSrc = getSafeImageSrc(src)
  const finalSrc = optimize ? optimizeCloudinaryUrl(safeSrc, width) : safeSrc

  const fallback = (
    <div
      className={cn(
        'bg-zinc-100 flex items-center justify-center',
        fallbackClassName || (fill ? 'absolute inset-0' : 'w-full h-full')
      )}
    >
      <ImageOff size={32} className="text-zinc-300" />
    </div>
  )

  if (!finalSrc || error) return fallback

  if (fill) {
    return (
      <Image
        src={finalSrc}
        alt={alt}
        fill
        priority={priority}
        className={className}
        sizes={sizes || '(max-width: 768px) 100vw, 50vw'}
        onError={() => setError(true)}
      />
    )
  }

  return (
    <Image
      src={finalSrc}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      sizes={sizes || '(max-width: 768px) 100vw, 50vw'}
      onError={() => setError(true)}
    />
  )
}
