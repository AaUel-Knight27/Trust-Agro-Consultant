"use client"
import Link from "next/link"
import { ArrowRight, Leaf } from "lucide-react"
import { useTranslations } from 'next-intl'

import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll"
import { slideInLeft, slideInRight } from "@/lib/animations"

export function AboutSnippetSection() {
  const t = useTranslations('about')

  return (
    <section className="py-20 px-6">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <AnimateOnScroll variants={slideInLeft} className="space-y-6">
          <SectionHeader tag={t('tag')} title={t('title')} />
          <p className="text-muted-foreground leading-relaxed">
            {t('body')}
          </p>
          <Button variant="outline" nativeButton={false} render={<Link href="/about" />}>
            {t('readMore')}
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </AnimateOnScroll>
        <AnimateOnScroll variants={slideInRight} className="flex aspect-video items-center justify-center rounded-xl bg-muted">
          <Leaf className="size-16 text-green-300" strokeWidth={1.25} aria-hidden />
        </AnimateOnScroll>
      </div>
    </section>
  )
}
