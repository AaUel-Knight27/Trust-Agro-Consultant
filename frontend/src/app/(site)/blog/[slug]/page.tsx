"use client"

import Link from "next/link"
import { BlurImage } from "@/components/shared/BlurImage"
import { useQuery } from "@tanstack/react-query"
import { ArrowLeft, CalendarDays, ChevronRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { getPost } from "@/lib/api"
import { resolveMediaUrl } from "@/lib/mediaUrl"

type PageProps = {
  params: { slug: string }
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch {
    return iso
  }
}

export default function BlogPostPage({ params }: PageProps) {
  const { slug } = params

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => getPost(slug),
    enabled: Boolean(slug),
  })

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Skeleton className="h-4 w-2/3 max-w-md" />
        <Skeleton className="mt-8 h-64 w-full rounded-xl" />
        <Skeleton className="mt-6 h-8 w-1/2" />
        <Skeleton className="mt-4 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-full" />
      </div>
    )
  }

  if (isError || !post) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold">Post not found</h1>
        <Button className="mt-8" nativeButton={false} render={<Link href="/blog" />}>
          Back to Blog
        </Button>
      </div>
    )
  }

  const coverSrc = resolveMediaUrl(post.cover_image)

  return (
    <article className="mx-auto max-w-4xl px-6 py-12">
      <nav className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="size-4 shrink-0" aria-hidden />
        <Link href="/blog" className="hover:text-foreground">
          Blog
        </Link>
        <ChevronRight className="size-4 shrink-0" aria-hidden />
        <span className="line-clamp-1 font-medium text-foreground">{post.title}</span>
      </nav>

      {post.cover_image && (
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl bg-muted">
          <BlurImage
            src={coverSrc || ""}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Badge variant="secondary" className="capitalize">
          {post.content_type.name}
        </Badge>
        {post.content_category ? (
          <Badge variant="outline">{post.content_category.name}</Badge>
        ) : null}
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <CalendarDays className="size-4" aria-hidden />
          {formatDate(post.published_at)}
        </p>
      </div>

      <h1 className="mt-6 text-4xl font-bold tracking-tight">{post.title}</h1>

      <div className="mt-10 max-w-none whitespace-pre-wrap text-base leading-relaxed text-foreground">
        {post.body}
      </div>

      <div className="mt-12 border-t pt-10">
        <Button variant="outline" nativeButton={false} render={<Link href="/blog" />}>
          <ArrowLeft className="mr-2 size-4" />
          Back to Blog
        </Button>
      </div>
    </article>
  )
}
