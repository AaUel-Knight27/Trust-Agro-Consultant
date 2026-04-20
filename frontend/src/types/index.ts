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

export interface SiteStat {
  id: number
  label: string
  value: string
  suffix: string
  icon_name: string
  order: number
}

export interface SiteConfig {
  phone: string
  email: string
  address: string
  whatsapp_number: string
  booking_url: string
  founded_year: number
}

export interface Testimonial {
  id: number
  full_name: string
  role: string
  organization: string
  photo: string | null
  message: string
  rating: number
  order: number
}

export interface GalleryCategory {
  id: number
  name: string
  slug: string
  image_count: number
}

export interface GalleryImage {
  id: number
  title: string
  description: string
  image: string
  category_name: string | null
  category_slug: string | null
  order: number
}

export interface ConsultationBooking {
  full_name: string
  email: string
  phone: string
  service_type: string
  farm_size?: string
  preferred_date: string
  preferred_time: string
  location: string
  notes?: string
}
