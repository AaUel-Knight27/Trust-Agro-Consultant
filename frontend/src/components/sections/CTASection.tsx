"use client"

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { IMAGES } from '@/lib/images'

export function CTASection() {
  const t = useTranslations('cta')

  return (
    <section className="relative py-32 px-6 overflow-hidden">

      {/* Background image */}
      <Image
        src={IMAGES.farmFieldAerial}
        alt="Agricultural fields"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Strong dark overlay */}
      <div className="absolute inset-0 bg-green-900/85" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
        <p className="text-green-300 text-xs uppercase tracking-widest font-semibold mb-4">
          Get Started Today
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {t('title')}
        </h2>
        <p className="text-zinc-300 text-lg mb-10 leading-relaxed">
          {t('subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            nativeButton={false}
            render={<Link href="/book" />}
            size="lg"
            className="bg-green-500 hover:bg-green-400 text-white rounded-full px-8 h-14"
          >
            {t('button')} <ArrowRight size={16} className="ml-2" />
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/contact" />}
            size="lg"
            variant="outline"
            className="border-white/40 text-white hover:bg-white/10 rounded-full px-8 h-14"
          >
            Contact Us
          </Button>
        </div>
      </div>

    </section>
  )
}
