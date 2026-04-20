"use client"

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll'
import { slideInLeft, slideInRight } from '@/lib/animations'
import { IMAGES } from '@/lib/images'

const highlights = [
  'Founded by experienced veterinary physicians',
  'Operations across Ethiopia since 2021',
  'Multidisciplinary approach to farm consulting',
  'Serving small farms to large commercial operations',
]

export function AboutSnippetSection() {
  const t = useTranslations('about')

  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left — Image collage */}
        <AnimateOnScroll variants={slideInLeft}>
          <div className="relative h-[520px]">

            {/* Main large image */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={IMAGES.aboutFarm}
                alt="Trust Agro Consult farm consulting"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Overlapping smaller image — bottom right */}
            <div className="absolute -bottom-6 -right-6 w-52 h-40 rounded-xl overflow-hidden 
                            border-4 border-white shadow-xl">
              <Image
                src={IMAGES.farmWorker}
                alt="Farm worker"
                fill
                className="object-cover"
                sizes="200px"
              />
            </div>

            {/* Stats badge — top left */}
            <div className="absolute -top-4 -left-4 bg-green-700 text-white 
                            rounded-xl px-5 py-4 shadow-xl">
              <p className="text-3xl font-bold">3+</p>
              <p className="text-green-200 text-xs mt-0.5">Years of Excellence</p>
            </div>

          </div>
        </AnimateOnScroll>

        {/* Right — Text */}
        <AnimateOnScroll variants={slideInRight}>
          <div className="space-y-6">
            <SectionHeader
              tag={t('tag')}
              title={t('title')}
            />

            <p className="text-zinc-600 leading-relaxed">
              {t('body')}
            </p>

            <ul className="space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-zinc-700">
                  <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <Button nativeButton={false} render={<Link href="/about" />} className="bg-green-700 hover:bg-green-800 rounded-full px-6">
              {t('readMore')} <ArrowRight size={14} className="ml-2" />
            </Button>
          </div>
        </AnimateOnScroll>

      </div>
    </section>
  )
}
