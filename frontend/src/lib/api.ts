import axios from "axios"
import { Service, Post, ContactForm } from "@/types"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
})

export const getServices = () =>
  api.get<Service[]>("/api/services/").then((r) => r.data)

export const getService = (slug: string) =>
  api.get<Service>(`/api/services/${slug}/`).then((r) => r.data)

export const getPosts = (category?: string) => {
  const params = category ? { category } : {}
  return api.get<Post[]>("/api/blog/posts/", { params }).then((r) => r.data)
}

export const getPost = (slug: string) =>
  api.get<Post>(`/api/blog/posts/${slug}/`).then((r) => r.data)

export const submitContact = (data: ContactForm) =>
  api.post("/api/contact/", data).then((r) => r.data)
