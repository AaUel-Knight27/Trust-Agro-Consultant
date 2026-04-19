import { Skeleton } from '@/components/ui/skeleton'

export function ServiceCardSkeleton() {
  return (
    <div className="border rounded-xl overflow-hidden bg-card">
      <Skeleton className="h-40 w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/3 mt-4" />
      </div>
    </div>
  )
}

export function PostCardSkeleton() {
  return (
    <div className="border rounded-xl overflow-hidden bg-card">
      <Skeleton className="h-48 w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/3 mt-4" />
      </div>
    </div>
  )
}

export function PageHeroSkeleton() {
  return (
    <div className="bg-zinc-100 py-24 px-6">
      <div className="max-w-4xl mx-auto space-y-4">
        <Skeleton className="h-12 w-1/2 mx-auto" />
        <Skeleton className="h-6 w-2/3 mx-auto" />
      </div>
    </div>
  )
}
