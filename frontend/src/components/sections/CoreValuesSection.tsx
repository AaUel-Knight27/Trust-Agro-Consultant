"use client"
import { Handshake, Heart, HeartHandshake, Zap } from "lucide-react"
import { useTranslations } from 'next-intl'

import { SectionHeader } from "@/components/shared/SectionHeader"
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll"

const valueIcons = [Heart, Handshake, Zap, HeartHandshake] as const
const valueKeys = ['respect', 'humility', 'empowerment', 'compassion'] as const

export function CoreValuesSection() {
  const t = useTranslations('values')

  return (
    <section className="bg-muted py-20 px-6">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeader tag={t('tag')} title={t('title')} centered />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {valueKeys.map((key, index) => {
            const Icon = valueIcons[index]
            return (
              <AnimateOnScroll 
                key={key} 
                delay={index * 0.1}
                className="flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                <div className="mb-4 rounded-full bg-green-100 p-3 text-green-700 dark:bg-green-950/50 dark:text-green-400">
                  <Icon className="size-6" aria-hidden />
                </div>
                <h3 className="font-semibold">{t(key)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(`${key}Desc`)}</p>
              </AnimateOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
