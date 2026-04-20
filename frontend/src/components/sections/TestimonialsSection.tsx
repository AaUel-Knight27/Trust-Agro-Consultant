'use client'
import { useQuery } from '@tanstack/react-query'
import { getTestimonials } from '@/lib/api'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { CloudinaryImage } from '@/components/shared/CloudinaryImage'
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll'
import { staggerContainer, scaleIn } from '@/lib/animations'
import { Quote, Star, User } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-200'}
        />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const t = useTranslations('testimonials')
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ['testimonials', 'featured'],
    queryFn: () => getTestimonials(true),
  })

  return (
    <section className="py-20 px-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          tag={t('tag')}
          title={t('title')}
          subtitle={t('subtitle')}
          centered
        />

        {isLoading ? (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-56 rounded-xl" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials?.map((t, index) => (
              <AnimateOnScroll key={t.id} variants={scaleIn} delay={index * 0.1}>
                <div className="bg-white rounded-xl p-6 border shadow-sm flex flex-col gap-4 h-full">
                  <Quote size={24} className="text-green-200" />
                  <p className="text-zinc-600 text-sm leading-relaxed flex-1">
                    {t.message}
                  </p>
                  <StarRating rating={t.rating} />
                  <div className="flex items-center gap-3 pt-2 border-t">
                    {t.photo ? (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        <CloudinaryImage
                          src={t.photo}
                          alt={t.full_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <User size={18} className="text-green-700" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">{t.full_name}</p>
                      <p className="text-xs text-zinc-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
