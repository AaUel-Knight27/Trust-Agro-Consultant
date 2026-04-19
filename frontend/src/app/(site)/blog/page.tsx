"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Newspaper } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { PostCard } from "@/components/shared/PostCard"
import { cn } from "@/lib/utils"
import { getPosts } from "@/lib/api"

/** Filter tabs use content type slugs (see `ContentType` in Django admin). */
const contentTypeFilters = ["all", "news", "blog", "announcement"] as const

function PostCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card ring-1 ring-foreground/10">
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  )
}

export default function BlogPage() {
  const [activeContentType, setActiveContentType] = useState<
    (typeof contentTypeFilters)[number]
  >("all")

  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["posts", activeContentType],
    queryFn: () => getPosts(activeContentType === "all" ? undefined : activeContentType),
  })

  return (
    <div>
      <section className="bg-zinc-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">News & Blog</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-300">
            Updates, insights, and announcements from Trust Agro Consult across Ethiopia&apos;s
            agricultural sector.
          </p>
        </div>
      </section>

      <section className="border-b bg-background py-8 px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2">
          {contentTypeFilters.map((slug) => (
            <Button
              key={slug}
              type="button"
              variant="outline"
              size="sm"
              className={cn(
                activeContentType === slug &&
                  "border-transparent bg-green-700 text-white hover:bg-green-800 hover:text-white"
              )}
              onClick={() => setActiveContentType(slug)}
            >
              {slug === "all" ? "All" : slug.charAt(0).toUpperCase() + slug.slice(1)}
            </Button>
          ))}
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isError ? (
            <p className="col-span-full text-center text-muted-foreground">
              Couldn&apos;t load posts. Please try again later.
            </p>
          ) : isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <PostCardSkeleton key={i} />)
          ) : !posts?.length ? (
            <div className="col-span-full flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
              <Newspaper className="size-12 text-zinc-400" strokeWidth={1.25} aria-hidden />
              <p className="text-lg font-medium">No posts yet</p>
            </div>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
      </section>
    </div>
  )
}
