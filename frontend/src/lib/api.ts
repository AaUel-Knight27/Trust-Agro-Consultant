import axios from 'axios'
import { Service, Post, ContactForm, TeamMember, SiteStat, SiteConfig, Testimonial, GalleryCategory, GalleryImage, ConsultationBooking } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

// Request interceptor for logging in development
if (process.env.NODE_ENV === 'development') {
  api.interceptors.request.use(config => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  })
}

// Response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data)
    } else if (error.request) {
      console.error('Network Error: No response received')
    }
    return Promise.reject(error)
  }
)

export const getServices = (): Promise<Service[]> =>
  api.get('/api/services/').then(r => r.data)

export const getService = (slug: string): Promise<Service> =>
  api.get(`/api/services/${slug}/`).then(r => r.data)

export const getPosts = (params?: {
  category?: string
  search?: string
}): Promise<Post[]> => {
  const queryParams: Record<string, string> = {}
  if (params?.category) queryParams.category = params.category
  if (params?.search) queryParams.search = params.search
  return api.get('/api/blog/posts/', { params: queryParams }).then(r => r.data)
}

export const getRelatedPosts = (slug: string): Promise<Post[]> =>
  api.get(`/api/blog/posts/${slug}/related/`).then(r => r.data)

export const getPost = (slug: string): Promise<Post> =>
  api.get(`/api/blog/posts/${slug}/`).then(r => r.data)

export const getTeamMembers = (): Promise<TeamMember[]> =>
  api.get('/api/team/').then(r => r.data)

export const submitContact = (data: ContactForm): Promise<{ message: string }> =>
  api.post('/api/contact/', data).then(r => r.data)

export const getSiteStats = (): Promise<SiteStat[]> =>
  api.get('/api/core/stats/').then(r => r.data)

export const getSiteConfig = (): Promise<SiteConfig> =>
  api.get('/api/core/config/').then(r => r.data)

export const getTestimonials = (featured?: boolean): Promise<Testimonial[]> => {
  const params = featured ? { featured: 'true' } : {}
  return api.get('/api/testimonials/', { params }).then(r => r.data)
}

export const getGalleryImages = (categorySlug?: string): Promise<GalleryImage[]> => {
  const params = categorySlug ? { category__slug: categorySlug } : {}
  return api.get('/api/gallery/', { params }).then(r => r.data)
}

export const getGalleryCategories = (): Promise<GalleryCategory[]> =>
  api.get('/api/gallery/categories/').then(r => r.data)

export const submitBooking = (data: ConsultationBooking): Promise<{ message: string, booking_date: string }> =>
  api.post('/api/contact/book/', data).then(r => r.data)

