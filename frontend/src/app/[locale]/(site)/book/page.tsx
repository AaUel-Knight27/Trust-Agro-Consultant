'use client'
import { useState } from 'react'
import { submitBooking } from '@/lib/api'
import { PageTransition } from '@/components/shared/PageTransition'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  CheckCircle2, CalendarCheck, User, Wheat, FileText
} from 'lucide-react'
import Image from 'next/image'
import { IMAGES } from '@/lib/images'

const SERVICE_OPTIONS = [
  { value: 'consulting', label: 'Consulting Services' },
  { value: 'training', label: 'Training Service' },
  { value: 'veterinary', label: 'Veterinary Medical Service' },
  { value: 'animal_feed', label: 'Animal Feed' },
  { value: 'farm_products', label: 'Sale of Farm Products' },
  { value: 'equipment', label: 'Animal Husbandry Equipment' },
  { value: 'general', label: 'General Inquiry' },
]

const FARM_SIZE_OPTIONS = [
  { value: '', label: 'Select farm size (optional)' },
  { value: 'small', label: 'Small (under 1 hectare)' },
  { value: 'medium', label: 'Medium (1-10 hectares)' },
  { value: 'large', label: 'Large (10+ hectares)' },
  { value: 'commercial', label: 'Commercial Farm' },
]

const TIME_OPTIONS = [
  { value: 'morning', label: 'Morning (8am - 12pm)' },
  { value: 'afternoon', label: 'Afternoon (12pm - 5pm)' },
  { value: 'any', label: 'Any Time' },
]

const initialForm = {
  full_name: '', email: '', phone: '',
  service_type: 'general', farm_size: '',
  preferred_date: '', preferred_time: 'any',
  location: '', notes: '',
}

export default function BookPage() {
  const [form, setForm] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)
    try {
      const result = await submitBooking(form)
      setSuccess(result.message)
      setForm(initialForm)
    } catch {
      setError('Something went wrong. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative py-32 px-6 overflow-hidden">
        <Image src={IMAGES.bookingBg} alt="Farm consulting" fill 
               className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-zinc-900/75" />
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-700/70 backdrop-blur-sm 
                          text-white text-xs font-semibold uppercase tracking-widest 
                          px-4 py-2 rounded-full mb-6">
            <CalendarCheck size={12} />
            Free Initial Consultation
          </div>
          <h1 className="text-5xl font-bold mb-4">Book a Consultation</h1>
          <p className="text-zinc-300 text-lg">
            Fill in the form below and our team will confirm your appointment within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">

          {success ? (
            <div className="text-center py-20 flex flex-col items-center gap-4">
              <CheckCircle2 size={56} className="text-green-600" />
              <h2 className="text-2xl font-bold">Booking Received!</h2>
              <p className="text-muted-foreground max-w-md">{success}</p>
              <Button
                className="mt-4 bg-green-700 hover:bg-green-800"
                onClick={() => setSuccess(null)}
              >
                Book Another Consultation
              </Button>
            </div>
          ) : (
            <div className="space-y-8">

              {/* Personal Info */}
              <div className="border rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <User size={18} className="text-green-700" /> Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Full Name *</Label>
                    <Input value={form.full_name} onChange={e => handleChange('full_name', e.target.value)} placeholder="Your full name" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Phone Number *</Label>
                    <Input value={form.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="+251 9XX XXX XXX" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Email Address *</Label>
                    <Input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} placeholder="your@email.com" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Location (City / Region) *</Label>
                    <Input value={form.location} onChange={e => handleChange('location', e.target.value)} placeholder="e.g. Bishoftu, Oromia" />
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div className="border rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Wheat size={18} className="text-green-700" /> Service Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Service Type *</Label>
                    <select
                      value={form.service_type}
                      onChange={e => handleChange('service_type', e.target.value)}
                      className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                    >
                      {SERVICE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Farm Size</Label>
                    <select
                      value={form.farm_size}
                      onChange={e => handleChange('farm_size', e.target.value)}
                      className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                    >
                      {FARM_SIZE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Scheduling */}
              <div className="border rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <CalendarCheck size={18} className="text-green-700" /> Preferred Schedule
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Preferred Date *</Label>
                    <Input
                      type="date"
                      min={today}
                      value={form.preferred_date}
                      onChange={e => handleChange('preferred_date', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Preferred Time</Label>
                    <select
                      value={form.preferred_time}
                      onChange={e => handleChange('preferred_time', e.target.value)}
                      className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                    >
                      {TIME_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="border rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <FileText size={18} className="text-green-700" /> Additional Notes
                </h3>
                <Textarea
                  rows={4}
                  value={form.notes}
                  onChange={e => handleChange('notes', e.target.value)}
                  placeholder="Describe your farming situation, specific challenges, or questions..."
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <Button
                className="w-full bg-green-700 hover:bg-green-800 text-white h-12 text-base"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Request Consultation'}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Or call us directly: <a href="tel:+251919076607" className="text-green-700 font-medium">+251 919 076 607</a>
              </p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
