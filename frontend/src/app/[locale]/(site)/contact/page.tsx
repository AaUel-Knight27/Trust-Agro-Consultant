"use client"

import { useState } from "react"
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react"
import { useTranslations } from 'next-intl'
import Image from "next/image"

import { IMAGES } from "@/lib/images"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { ContactForm } from "@/types"
import { submitContact } from "@/lib/api"
import { PageTransition } from "@/components/shared/PageTransition"

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
  const t = useTranslations('contact')
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid email address.")
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
      setError(t('error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageTransition>
      <section className="bg-zinc-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{t('title')}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-300">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
          <div className="relative rounded-2xl overflow-hidden min-h-96 lg:min-h-[600px]">
            <Image
              src={IMAGES.contactBg}
              alt="Trust Agro farm"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-green-900/80" />

            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between text-white">
              <div>
                <p className="text-green-300 text-xs uppercase tracking-widest font-semibold mb-2">
                  Reach Us
                </p>
                <h2 className="text-3xl font-bold mb-6">Let&apos;s Talk Agriculture</h2>
                <p className="text-zinc-300 leading-relaxed mb-8">
                  Whether you&apos;re a smallholder or managing a commercial operation, 
                  our team is ready to help.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">Address</p>
                    <p className="text-sm font-medium">Addis Ababa, Ethiopia</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">{t('phone')}</p>
                    <a href="tel:+251919076607" className="text-sm font-medium hover:text-green-300 transition-colors">
                      +251 919 076 607
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">{t('email')}</p>
                    <a href="mailto:info@trustagroconsult.com"
                       className="text-sm font-medium hover:text-green-300 transition-colors">
                      info@trustagroconsult.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-10 text-center ring-1 ring-foreground/10">
                <CheckCircle2 className="size-12 text-green-600" aria-hidden />
                <p className="text-lg font-semibold">{t('success')}</p>
                <Button type="button" variant="outline" onClick={() => setIsSuccess(false)}>
                  {t('send')}
                </Button>
              </div>
            ) : (
              <div className="space-y-6 rounded-xl border border-border bg-card p-6 ring-1 ring-foreground/10">
                <div className="space-y-2">
                  <Label htmlFor="full_name">{t('fullName')}</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => update("full_name", e.target.value)}
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => update("email", e.target.value)}
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('phoneOptional')}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    autoComplete="tel"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">{t('subject')}</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => update("subject", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{t('message')}</Label>
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
                  {isSubmitting ? t('sending') : t('send')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-16 px-6">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-border shadow-sm">
          <div className="w-full h-[300px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d246.28023899883493!2d38.81382753767519!3d9.019551557737914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2set!4v1776679442417!5m2!1sen!2set"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
