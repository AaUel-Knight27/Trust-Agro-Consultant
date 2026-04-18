"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ServiceCard } from "@/components/shared/ServiceCard"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { getServices } from "@/lib/api"

function ServiceCardSkeleton() {
  return (
    <div className="flex h-48 flex-col overflow-hidden rounded-xl border border-border bg-card p-4 ring-1 ring-foreground/10">
      <Skeleton className="size-12 rounded-lg" />
      <Skeleton className="mt-4 h-5 w-3/4" />
      <Skeleton className="mt-3 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-5/6" />
    </div>
  )
}

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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                short_description={service.short_description}
                icon_name={service.icon_name}
                slug={service.slug}
              />
            ))}
          </div>
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
