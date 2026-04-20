'use client'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { getGalleryImages, getGalleryCategories } from '@/lib/api'
import { BlurImage } from '@/components/shared/BlurImage'
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { PageTransition } from '@/components/shared/PageTransition'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { ImageOff } from 'lucide-react'

export default function GalleryPage() {
  const t = useTranslations('gallery')
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined)
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const { data: categories } = useQuery({
    queryKey: ['gallery-categories'],
    queryFn: getGalleryCategories,
  })

  const { data: images, isLoading } = useQuery({
    queryKey: ['gallery', activeCategory],
    queryFn: () => getGalleryImages(activeCategory),
  })

  const slides = images?.map(img => ({ src: img.image, alt: img.title })) || []

  return (
    <PageTransition>
      {/* Hero */}
      <section className="bg-zinc-900 text-white py-24 px-6 text-center">
        <SectionHeader
          tag={t('tag')}
          title={t('title')}
          subtitle={t('subtitle')}
          centered
        />
      </section>

      {/* Filter tabs */}
      <section className="py-8 px-6 border-b bg-white sticky top-16 z-30">
        <div className="max-w-7xl mx-auto flex gap-2 flex-wrap">
          <Button
            size="sm"
            variant={activeCategory === undefined ? 'default' : 'outline'}
            className={activeCategory === undefined ? 'bg-green-700 hover:bg-green-800' : ''}
            onClick={() => setActiveCategory(undefined)}
          >
            {t('all')}
          </Button>
          {categories?.map(cat => (
            <Button
              key={cat.id}
              size="sm"
              variant={activeCategory === cat.slug ? 'default' : 'outline'}
              className={activeCategory === cat.slug ? 'bg-green-700 hover:bg-green-800' : ''}
              onClick={() => setActiveCategory(cat.slug)}
            >
              {cat.name} ({cat.image_count})
            </Button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(12)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-xl" />
              ))}
            </div>
          ) : images?.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              <ImageOff size={48} className="mx-auto mb-4 text-zinc-300" />
              <p>{t('noImages')}</p>
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {images?.map((img, index) => (
                <AnimateOnScroll key={img.id} delay={index * 0.03}>
                  <div
                    className="relative overflow-hidden rounded-xl cursor-pointer group break-inside-avoid"
                    onClick={() => setLightboxIndex(index)}
                  >
                    <div className="relative w-full">
                      <BlurImage
                        src={img.image}
                        alt={img.title}
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-3">
                      <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                        {img.title}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
      />
    </PageTransition>
  )
}
