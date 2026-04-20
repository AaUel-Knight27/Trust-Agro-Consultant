/** Resolve API-relative media paths to absolute URLs for next/image. */
export function resolveMediaUrl(path: string | null | undefined): string | null {
  if (!path) return null

  // If it's already a full URL, return it
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path
  }

  // Return the path directly, expecting the backend to provide full Cloudinary URLs.
  // If it's a relative path, we just return it so next/image can attempt to resolve it or fail gracefully.
  return path
}
