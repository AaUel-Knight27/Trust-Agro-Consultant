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

export interface ContentTypeRef {
  id: number
  name: string
  slug: string
}

export interface ContentCategoryRef {
  id: number
  name: string
  slug: string
}

export interface Post {
  id: number
  title: string
  slug: string
  cover_image: string | null
  excerpt: string
  body: string
  content_type: ContentTypeRef
  content_category: ContentCategoryRef | null
  published_at: string
}

export interface ContactForm {
  full_name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface TeamMember {
  id: number
  name: string
  role: string
  photo: string | null
  facebook_url: string
  linkedin_url: string
  email: string
  phone: string
  experience_short: string
  order: number
}
