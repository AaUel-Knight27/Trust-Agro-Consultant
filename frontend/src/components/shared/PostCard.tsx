import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CalendarDays, Newspaper } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { resolveMediaUrl } from "@/lib/mediaUrl"
import type { Post } from "@/types"

type PostCardProps = {
  post: Post
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch {
    return iso
  }
}

export function PostCard({ post }: PostCardProps) {
  const coverSrc = resolveMediaUrl(post.cover_image)

  return (
    <Card className="flex h-full min-h-0 flex-col overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative aspect-video w-full shrink-0 overflow-hidden">
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-100">
            <Newspaper className="size-14 text-zinc-400" strokeWidth={1.25} aria-hidden />
          </div>
        )}
      </div>
      <CardHeader className="gap-2">
        <Badge variant="secondary" className="w-fit capitalize">
          {post.category}
        </Badge>
        <CardTitle className="line-clamp-2 text-lg font-semibold leading-snug">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <p className="line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
        <p className="mt-auto flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5 shrink-0" aria-hidden />
          {formatDate(post.published_at)}
        </p>
      </CardContent>
      <CardFooter className="border-t-0 pt-0">
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-sm font-medium text-green-700 hover:text-green-800"
        >
          Read More
          <ArrowRight className="ml-1 size-4" />
        </Link>
      </CardFooter>
    </Card>
  )
}
