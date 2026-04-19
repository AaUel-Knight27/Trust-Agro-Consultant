/** Resolve API-relative media paths to absolute URLs for next/image. */
export function resolveMediaUrl(path: string | null | undefined): string | null {
  if (!path) return null

  // If it's already a full URL, return it
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path
  }

  // Fallback to local API URL
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? ""
  const cleanPath = path.startsWith("/") ? path : `/${path}`

  return `${baseUrl}${cleanPath}`
}
