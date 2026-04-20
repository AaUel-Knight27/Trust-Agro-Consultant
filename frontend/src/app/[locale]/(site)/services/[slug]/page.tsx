"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { getLucideIcon } from "@/components/shared/ServiceCard"
import { getService, getServices } from "@/lib/api"
import { getSafeImageSrc } from "@/lib/imageUtils"
import { PageTransition } from "@/components/shared/PageTransition"
import { IMAGES } from "@/lib/images"
import Image from "next/image"

const SERVICE_IMAGES: Record<string, string> = {
  'consulting-services': IMAGES.serviceConsulting,
  'training-service': IMAGES.serviceTraining,
  'veterinary-medical-service': IMAGES.serviceVeterinary,
  'animal-feed': IMAGES.serviceAnimalFeed,
  'sale-of-farm-products': IMAGES.serviceFarmProducts,
  'animal-husbandry-equipment': IMAGES.serviceEquipment,
}

type PageProps = {
  params: { slug: string }
}

function ServiceDetailSkeleton() {
  return (
    <PageTransition className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-12 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Skeleton className="aspect-video w-full rounded-xl" />
          <Skeleton className="mx-auto size-16 rounded-full" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-14 w-full rounded-lg" />
          <Skeleton className="h-14 w-full rounded-lg" />
          <Skeleton className="h-14 w-full rounded-lg" />
        </div>
      </div>
    </PageTransition>
  )
}

export default function ServiceDetailPage({ params }: PageProps) {
  const { slug } = params

  const serviceQuery = useQuery({
    queryKey: ["service", slug],
    queryFn: () => getService(slug),
    enabled: Boolean(slug),
  })

  const servicesQuery = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
    enabled: Boolean(slug),
  })

  const service = serviceQuery.data
  const coverSrc = getSafeImageSrc(service?.cover_image ?? null)

  const otherServices =
    servicesQuery.data?.filter((s) => s.slug !== slug) ?? []

  if (serviceQuery.isLoading || servicesQuery.isLoading) {
    return <ServiceDetailSkeleton />
  }

  if (serviceQuery.isError || !service) {
    return (
      <PageTransition className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold">Service not found</h1>
        <p className="mt-2 text-muted-foreground">
          We couldn&apos;t load this service. It may have been removed or the link is incorrect.
        </p>
        <Button className="mt-8" nativeButton={false} render={<Link href="/services" />}>
          Back to services
        </Button>
      </PageTransition>
    )
  }

  return (
    <PageTransition className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-12 lg:grid-cols-3">
        <article className="space-y-8 lg:col-span-2">
          <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl mb-10">
            <Image
              src={coverSrc || SERVICE_IMAGES[service.slug] || IMAGES.aboutFarm}
              alt={service.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-flex items-center gap-2 bg-green-700 text-white 
                              rounded-full px-4 py-1.5 text-sm font-medium">
                {(() => { const ServiceIcon = getLucideIcon(service.icon_name); return <ServiceIcon size={14} /> })()}
                {service.title}
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{service.title}</h1>
          <div className="whitespace-pre-wrap leading-relaxed text-foreground">
            {service.full_description}
          </div>

          <Button
            className="bg-green-700 text-white hover:bg-green-800"
            nativeButton={false}
            render={<Link href="/book" />}
          >
            Book a Consultation
          </Button>
        </article>

        <aside className="lg:col-span-1">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Other Services
          </h2>
          <nav className="mt-4 flex flex-col gap-2">
            {otherServices.length === 0 ? (
              <p className="text-sm text-muted-foreground">No other services listed.</p>
            ) : (
              otherServices.map((s) => {
                const SIcon = getLucideIcon(s.icon_name)
                return (
                  <Link
                    key={s.id}
                    href={`/services/${s.slug}`}
                    className="flex items-center gap-2 rounded-lg border border-border p-3 text-sm transition-colors hover:bg-muted"
                  >
                    <SIcon className="size-4 shrink-0 text-green-600" aria-hidden />
                    <span className="font-medium">{s.title}</span>
                  </Link>
                )
              })
            )}
          </nav>
        </aside>
      </div>
    </PageTransition>
  )
}
