/**
 * Returns true if the URL is a valid Cloudinary URL.
 * Use this to verify images are coming from the right place.
 */
export function isCloudinaryUrl(url: string | null | undefined): boolean {
  if (!url) return false
  return url.startsWith('https://res.cloudinary.com/')
}

/**
 * Returns the image src safely.
 * If the URL is not from Cloudinary or Unsplash, returns null
 * so the component can show a fallback instead.
 */
export function getSafeImageSrc(
  url: string | null | undefined
): string | null {
  if (!url) return null
  if (
    url.startsWith('https://res.cloudinary.com/') ||
    url.startsWith('https://images.unsplash.com/')
  ) {
    return url
  }
  // URL is from local disk or Render disk — don't use it
  console.warn('Image URL is not from Cloudinary:', url)
  return null
}

/**
 * Adds Cloudinary transformations to an existing Cloudinary URL.
 * For example: auto format, auto quality, resize.
 */
export function optimizeCloudinaryUrl(
  url: string | null | undefined,
  width = 800
): string | null {
  if (!url) return null
  if (!url.startsWith('https://res.cloudinary.com/')) return url

  // Insert transformation parameters into the URL
  // Cloudinary URL format:
  // https://res.cloudinary.com/{cloud}/image/upload/{transformations}/{public_id}
  return url.replace(
    '/image/upload/',
    `/image/upload/w_${width},f_auto,q_auto/`
  )
}
