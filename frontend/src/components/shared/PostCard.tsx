import { BlurImage } from "./BlurImage"
import Link from "next/link"
import { ArrowRight, CalendarDays } from "lucide-react"
import { useTranslations } from 'next-intl'

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getSafeImageSrc } from "@/lib/imageUtils"
import type { Post } from "@/types"
import { IMAGES } from "@/lib/images"

type PostCardProps = {
  post: Post
}

function formatDate(iso: string, locale: string = 'en-US') {
  try {
    return new Date(iso).toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch {
    return iso
  }
}

export function PostCard({ post }: PostCardProps) {
  const t = useTranslations('blog')
  const safeCoverSrc = getSafeImageSrc(post.cover_image)

  const BLOG_FALLBACKS = [
    IMAGES.greenFields,
    IMAGES.livestock,
    IMAGES.farmWorker,
    IMAGES.dairy,
  ]
  const fallback = BLOG_FALLBACKS[post.id % BLOG_FALLBACKS.length]
  const coverSrc = safeCoverSrc || fallback

  return (
    <Card className="group flex h-full min-h-0 flex-col overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg shrink-0">
        <BlurImage
          src={coverSrc}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardHeader className="gap-2">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="w-fit capitalize">
            {post.content_type.name}
          </Badge>
          {post.content_category ? (
            <Badge variant="outline" className="w-fit">
              {post.content_category.name}
            </Badge>
          ) : null}
        </div>
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
          {t('readMore')}
          <ArrowRight className="ml-1 size-4" />
        </Link>
      </CardFooter>
    </Card>
  )
}
