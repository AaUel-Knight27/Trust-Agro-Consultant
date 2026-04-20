"use client"
import { useQuery } from '@tanstack/react-query'
import { getSiteStats } from '@/lib/api'
import { motion } from "framer-motion"
import { staggerContainer } from "@/lib/animations"
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll"
import { AnimatedCounter } from "@/components/shared/AnimatedCounter"
import { getLucideIcon } from '@/components/shared/ServiceCard'
import { Skeleton } from '@/components/ui/skeleton'

export function StatsSection() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['site-stats'],
    queryFn: getSiteStats,
  })

  if (isLoading) {
    return (
      <section className="bg-green-700 py-20 px-6 text-white overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl bg-green-600/50" />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="bg-green-700 py-20 px-6 text-white overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4 md:gap-0 md:divide-x md:divide-white/20"
      >
        {stats?.map((stat, index) => {
          const Icon = getLucideIcon(stat.icon_name)
          return (
            <AnimateOnScroll 
              key={stat.id} 
              delay={index * 0.1}
              className="flex flex-col items-center justify-center px-4 py-4 text-center md:py-2"
            >
              <Icon className="mb-3 size-8 text-white/90" strokeWidth={1.5} aria-hidden />
              <p className="text-4xl font-bold tracking-tight md:text-5xl">
                <AnimatedCounter value={`${stat.value}${stat.suffix}`} />
              </p>
              <p className="mt-2 text-sm font-medium text-white/90">{stat.label}</p>
            </AnimateOnScroll>
          )
        })}
      </motion.div>
    </section>
  )
}
