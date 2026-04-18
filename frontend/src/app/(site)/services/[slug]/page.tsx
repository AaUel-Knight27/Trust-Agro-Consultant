"use client"

import Image from "next/image"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { Wheat } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { getLucideIcon } from "@/components/shared/ServiceCard"
import { getService, getServices } from "@/lib/api"
import { resolveMediaUrl } from "@/lib/mediaUrl"

type PageProps = {
  params: { slug: string }
}

function ServiceDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
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
    </div>
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
  const coverSrc = resolveMediaUrl(service?.cover_image ?? null)
  const Icon = service ? getLucideIcon(service.icon_name) : Wheat

  const otherServices =
    servicesQuery.data?.filter((s) => s.slug !== slug) ?? []

  if (serviceQuery.isLoading || servicesQuery.isLoading) {
    return <ServiceDetailSkeleton />
  }

  if (serviceQuery.isError || !service) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold">Service not found</h1>
        <p className="mt-2 text-muted-foreground">
          We couldn&apos;t load this service. It may have been removed or the link is incorrect.
        </p>
        <Button className="mt-8" nativeButton={false} render={<Link href="/services" />}>
          Back to services
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-12 lg:grid-cols-3">
        <article className="space-y-8 lg:col-span-2">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-100">
            {coverSrc ? (
              <Image
                src={coverSrc}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
            ) : (
              <div className="flex h-full min-h-[12rem] items-center justify-center">
                <Icon className="size-20 text-green-300" strokeWidth={1.25} aria-hidden />
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-green-100 text-green-600">
              <Icon className="size-7" aria-hidden />
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{service.title}</h1>
          <div className="whitespace-pre-wrap leading-relaxed text-foreground">
            {service.full_description}
          </div>

          <Button
            className="bg-green-700 text-white hover:bg-green-800"
            nativeButton={false}
            render={
              <a
                href="https://trustagroconsult.com/book-consulting"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
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
                    className="flex items-center gap-2 rounded-lg border border-border p-3 text-sm transition-colors hover:bg-zinc-50"
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
    </div>
  )
}
