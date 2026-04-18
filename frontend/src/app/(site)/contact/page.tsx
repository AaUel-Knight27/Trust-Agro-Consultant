"use client"

import { useState } from "react"
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { ContactForm } from "@/types"
import { submitContact } from "@/lib/api"

type FormState = {
  full_name: string
  email: string
  phone: string
  subject: string
  message: string
}

const initialForm: FormState = {
  full_name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormState>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setError(null)

    if (!formData.full_name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setError("Please fill in all required fields.")
      return
    }

    setIsSubmitting(true)
    try {
      const payload: ContactForm = {
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        ...(formData.phone?.trim() ? { phone: formData.phone.trim() } : {}),
      }
      await submitContact(payload)
      setIsSuccess(true)
      setFormData(initialForm)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <section className="bg-zinc-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-300">
            Reach out for consulting, training, or farm support. We respond as soon as we can.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-start gap-4 rounded-xl border border-border p-6">
              <MapPin className="mt-1 size-5 shrink-0 text-green-700" aria-hidden />
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="mt-1 text-muted-foreground">Addis Ababa, Ethiopia</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-xl border border-border p-6">
              <Phone className="mt-1 size-5 shrink-0 text-green-700" aria-hidden />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <a
                  href="tel:+251919076607"
                  className="mt-1 inline-block text-muted-foreground transition-colors hover:text-foreground"
                >
                  +251 919 076 607
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-xl border border-border p-6">
              <Mail className="mt-1 size-5 shrink-0 text-green-700" aria-hidden />
              <div>
                <p className="text-sm font-medium">Email</p>
                <a
                  href="mailto:info@trustagroconsult.com"
                  className="mt-1 inline-block text-muted-foreground transition-colors hover:text-foreground"
                >
                  info@trustagroconsult.com
                </a>
              </div>
            </div>
          </div>

          <div>
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-10 text-center ring-1 ring-foreground/10">
                <CheckCircle2 className="size-12 text-green-600" aria-hidden />
                <p className="text-lg font-semibold">Message sent successfully!</p>
                <Button type="button" variant="outline" onClick={() => setIsSuccess(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <div className="space-y-6 rounded-xl border border-border bg-card p-6 ring-1 ring-foreground/10">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => update("full_name", e.target.value)}
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => update("email", e.target.value)}
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    autoComplete="tel"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => update("subject", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => update("message", e.target.value)}
                  />
                </div>

                {error ? <p className="text-sm text-red-500">{error}</p> : null}

                <Button
                  type="button"
                  className="w-full bg-green-700 text-white hover:bg-green-800"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
