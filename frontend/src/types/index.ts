export interface Service {
  id: number
  title: string
  slug: string
  short_description: string
  full_description: string
  icon_name: string
  cover_image: string | null
  order: number
}

export interface Post {
  id: number
  title: string
  slug: string
  cover_image: string | null
  excerpt: string
  body: string
  category: "news" | "blog" | "announcement"
  published_at: string
}

export interface ContactForm {
  full_name: string
  email: string
  phone?: string
  subject: string
  message: string
}
