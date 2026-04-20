"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from 'next-intl'

import { Button } from "@/components/ui/button"
import { ServiceCardSkeleton } from "@/components/shared/LoadingSkeleton"
import { ServiceCard } from "@/components/shared/ServiceCard"
import { getServices } from "@/lib/api"
import { PageTransition } from "@/components/shared/PageTransition"
import Image from "next/image"
import { IMAGES } from "@/lib/images"

export default function ServicesPage() {
  const t = useTranslations('services')
  const { data: services, isLoading, isError } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  })

  return (
    <PageTransition>
      <section className="relative py-32 px-6 overflow-hidden">
        <Image src={IMAGES.serviceConsulting} alt="Services background" fill 
               className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-zinc-900/70" />
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-zinc-300 text-lg">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isError ? (
            <p className="col-span-full text-center text-muted-foreground">
              We couldn&apos;t load services. Please try again later.
            </p>
          ) : isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <ServiceCardSkeleton key={i} />)
          ) : !services?.length ? (
            <p className="col-span-full text-center text-muted-foreground">No services listed yet.</p>
          ) : (
            services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                short_description={service.short_description}
                icon_name={service.icon_name}
                slug={service.slug}
                cover_image={service.cover_image}
              />
            ))
          )}
        </div>
      </section>

      <section className="border-t bg-muted py-16 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight">Ready to get started?</h2>
          <p className="mt-2 text-muted-foreground">
            Tell us about your farm or operation and we&apos;ll help you plan the next step.
          </p>
          <Button
            className="mt-8 bg-green-700 text-white hover:bg-green-800"
            nativeButton={false}
            render={<Link href="/contact" />}
          >
            {t('bookConsultation')}
          </Button>
        </div>
      </section>
    </PageTransition>
  )
}
