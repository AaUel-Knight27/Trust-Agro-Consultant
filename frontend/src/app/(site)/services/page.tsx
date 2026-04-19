"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { ServiceCardSkeleton } from "@/components/shared/LoadingSkeleton"
import { ServiceCard } from "@/components/shared/ServiceCard"
import { getServices } from "@/lib/api"

export default function ServicesPage() {
  const { data: services, isLoading, isError } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  })

  return (
    <div>
      <section className="bg-zinc-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Our Services</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-300">
            Explore our full range of agricultural consulting, training, and farm support offerings
            tailored to Ethiopian producers.
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
            Contact us
          </Button>
        </div>
      </section>
    </div>
  )
}
