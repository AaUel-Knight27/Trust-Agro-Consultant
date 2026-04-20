"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from 'next-intl'

import { Button } from "@/components/ui/button"

export function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-zinc-900">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,theme(colors.white/5)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.white/5)_1px,transparent_1px)] bg-[length:48px_48px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-green-950/50"
        aria-hidden
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 py-20 text-center"
      >
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-green-700">
          {t('tag')}
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
          {t('headline')}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl text-zinc-300">
          {t('subtext')}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              size="lg"
              nativeButton={false}
              className="bg-green-700 text-white hover:bg-green-800"
              render={<Link href="/book" />}
            >
              {t('cta1')}
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              className="border-white text-white hover:bg-white/10"
              render={<Link href="/about" />}
            >
              {t('cta2')}
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 justify-center">
        <ChevronDown className="size-8 animate-bounce text-zinc-400" aria-hidden />
      </div>
    </section>
  )
}
