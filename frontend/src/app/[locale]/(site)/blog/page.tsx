"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Newspaper } from "lucide-react"
import { useTranslations } from 'next-intl'

import { Button } from "@/components/ui/button"
import { PostCardSkeleton } from "@/components/shared/LoadingSkeleton"
import { PostCard } from "@/components/shared/PostCard"
import { cn } from "@/lib/utils"
import { getPosts } from "@/lib/api"
import { PageTransition } from "@/components/shared/PageTransition"
import { SearchBar } from "@/components/shared/SearchBar"
import Image from "next/image"
import { IMAGES } from "@/lib/images"

/** Filter tabs use content type slugs (see `ContentType` in Django admin). */
const contentTypeFilters = ["all", "news", "blog", "announcement"] as const

export default function BlogPage() {
  const t = useTranslations('blog')
  const [activeContentType, setActiveContentType] = useState<
    (typeof contentTypeFilters)[number]
  >("all")
  const [searchQuery, setSearchQuery] = useState("")

  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["posts", activeContentType, searchQuery],
    queryFn: () => getPosts({
      category: activeContentType === "all" ? undefined : activeContentType,
      search: searchQuery || undefined,
    }),
  })

  return (
    <PageTransition>
      <section className="relative py-32 px-6 overflow-hidden">
        <Image src={IMAGES.greenFields} alt="Farm fields" fill 
               className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-zinc-900/70" />
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-zinc-300 text-lg">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="border-b bg-background py-8 px-6">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-2 flex-wrap">
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
          <div className="w-full sm:w-64">
            <SearchBar onSearch={setSearchQuery} />
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isError ? (
            <p className="col-span-full text-center text-muted-foreground">
              Couldn&apos;t load posts. Please try again later.
            </p>
          ) : isLoading ? (
            <>
              {searchQuery && (
                <p className="col-span-full text-center text-muted-foreground mb-4 animate-pulse">
                  Searching for &quot;{searchQuery}&quot;...
                </p>
              )}
              {Array.from({ length: 6 }).map((_, i) => <PostCardSkeleton key={i} />)}
            </>
          ) : !posts?.length ? (
            <div className="col-span-full flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
              {searchQuery ? (
                <>
                  <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-2">
                    <Newspaper className="size-8 text-zinc-400" strokeWidth={1.25} aria-hidden />
                  </div>
                  <p className="text-xl font-medium text-foreground">{t('noResults')}</p>
                  <p className="text-zinc-500">Try a different keyword or category</p>
                </>
              ) : (
                <>
                  <Newspaper className="size-12 text-zinc-400" strokeWidth={1.25} aria-hidden />
                  <p className="text-lg font-medium">No posts yet</p>
                </>
              )}
            </div>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
      </section>
    </PageTransition>
  )
}
