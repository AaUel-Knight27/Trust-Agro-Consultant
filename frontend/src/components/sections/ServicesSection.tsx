"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { ServiceCardSkeleton } from "@/components/shared/LoadingSkeleton"
import { ServiceCard } from "@/components/shared/ServiceCard"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { getServices } from "@/lib/api"
import { motion } from "framer-motion"
import { staggerContainer, scaleIn } from "@/lib/animations"
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll"

export function ServicesSection() {
  const { data: services, isLoading, isError } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  })

  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeader
          tag="What We Do"
          title="Our Services"
          subtitle="Comprehensive agricultural solutions for every farming level."
          centered
        />

        {isError ? (
          <p className="text-center text-muted-foreground">
            We couldn&apos;t load services right now. Please try again later.
          </p>
        ) : isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        ) : !services?.length ? (
          <p className="text-center text-muted-foreground">No services are listed yet.</p>
        ) : (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service, index) => (
              <AnimateOnScroll 
                key={service.id} 
                delay={index * 0.08} 
                variants={scaleIn}
              >
                <ServiceCard
                  title={service.title}
                  short_description={service.short_description}
                  icon_name={service.icon_name}
                  slug={service.slug}
                  cover_image={service.cover_image}
                />
              </AnimateOnScroll>
            ))}
          </motion.div>
        )}

        <div className="flex justify-center">
          <Button nativeButton={false} render={<Link href="/services" />}>
            View All Services
          </Button>
        </div>
      </div>
    </section>
  )
}
