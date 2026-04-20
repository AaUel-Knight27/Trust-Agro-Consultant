"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useTranslations } from 'next-intl'

import { Button } from "@/components/ui/button"
import { IMAGES } from "@/lib/images"

export function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full background image */}
      <Image
        src={IMAGES.hero}
        alt="Lush agricultural farmland"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark gradient overlay — stronger at bottom, lighter at top */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center text-white px-6 max-w-5xl mx-auto">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-green-700/80 backdrop-blur-sm 
                     text-white text-xs font-semibold uppercase tracking-widest 
                     px-4 py-2 rounded-full mb-6"
        >
          <span className="w-1.5 h-1.5 bg-green-300 rounded-full" />
          {t('tag')}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6"
        >
          {t('headline')}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg md:text-xl text-zinc-200 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('subtext')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            nativeButton={false}
            render={<Link href="/book" />}
            size="lg"
            className="bg-green-600 hover:bg-green-500 text-white text-base px-8 h-14 rounded-full"
          >
            {t('cta1')} <ArrowRight size={16} className="ml-2" />
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/about" />}
            size="lg"
            variant="outline"
            className="border-white/50 text-white hover:bg-white/10 backdrop-blur-sm 
                       text-base px-8 h-14 rounded-full"
          >
            {t('cta2')}
          </Button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-zinc-300"
        >
          {[
            '500+ Trained Farmers',
            '50+ Successful Projects',
            '3+ Years of Experience',
            '10+ Locations Served',
          ].map((badge) => (
            <div key={badge} className="flex items-center gap-2">
              <span className="w-1 h-1 bg-green-400 rounded-full" />
              {badge}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 
                   flex flex-col items-center gap-2 text-white/60 text-xs"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-0.5 h-8 bg-white/30 rounded-full"
        />
      </motion.div>

    </section>
  )
}
