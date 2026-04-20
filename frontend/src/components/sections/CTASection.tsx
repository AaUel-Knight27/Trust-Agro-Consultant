"use client"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from 'next-intl'

import { Button } from "@/components/ui/button"

export function CTASection() {
  const t = useTranslations('cta')

  return (
    <section className="w-full bg-green-700 py-20 px-6 text-white">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          {t('title')}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
          {t('subtitle')}
        </p>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            className="mt-10 border-white text-white hover:bg-white hover:text-green-700"
            render={<Link href="/book" />}
          >
            {t('button')}
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
