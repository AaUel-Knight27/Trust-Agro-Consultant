"use client"
import { Award, CheckCircle2, MapPin, Users } from "lucide-react"
import { motion } from "framer-motion"
import { staggerContainer } from "@/lib/animations"
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll"
import { AnimatedCounter } from "@/components/shared/AnimatedCounter"

const stats = [
  { value: "10+", label: "Locations", icon: MapPin },
  { value: "500+", label: "Trained Farmers", icon: Users },
  { value: "50+", label: "Successful Projects", icon: CheckCircle2 },
  { value: "3+", label: "Years of Experience", icon: Award },
] as const

export function StatsSection() {
  return (
    <section className="bg-green-700 py-20 px-6 text-white overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4 md:gap-0 md:divide-x md:divide-white/20"
      >
        {stats.map(({ value, label, icon: Icon }, index) => (
          <AnimateOnScroll 
            key={label} 
            delay={index * 0.1}
            className="flex flex-col items-center justify-center px-4 py-4 text-center md:py-2"
          >
            <Icon className="mb-3 size-8 text-white/90" strokeWidth={1.5} aria-hidden />
            <p className="text-4xl font-bold tracking-tight md:text-5xl">
              <AnimatedCounter value={value} />
            </p>
            <p className="mt-2 text-sm font-medium text-white/90">{label}</p>
          </AnimateOnScroll>
        ))}
      </motion.div>
    </section>
  )
}
