import axios from 'axios'
import { Service, Post, ContactForm, TeamMember } from '@/types'

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

export const getPosts = (category?: string): Promise<Post[]> => {
  const params = category ? { category } : {}
  return api.get('/api/blog/posts/', { params }).then(r => r.data)
}

export const getPost = (slug: string): Promise<Post> =>
  api.get(`/api/blog/posts/${slug}/`).then(r => r.data)

export const getTeamMembers = (): Promise<TeamMember[]> =>
  api.get('/api/team/').then(r => r.data)

export const submitContact = (data: ContactForm): Promise<{ message: string }> =>
  api.post('/api/contact/', data).then(r => r.data)
