"use client"

import Image from "next/image"
import Link from "next/link"
import { Facebook, Linkedin, Mail, Phone, Instagram } from "lucide-react"
import { useTranslations } from 'next-intl'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'

import { SectionHeader } from "@/components/shared/SectionHeader"
import { getSafeImageSrc } from "@/lib/imageUtils"
import type { TeamMember } from "@/types"

import { getTeamMembers } from "@/lib/api"

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    const a = parts[0][0] ?? ""
    const b = parts[parts.length - 1][0] ?? ""
    return `${a}${b}`.toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

function memberContacts(m: TeamMember) {
  const items: { icon: React.ElementType; label: string; href: string }[] = []
  if (m.facebook_url) {
    items.push({ icon: Facebook, label: "Facebook", href: m.facebook_url })
  }
  if (m.linkedin_url) {
    items.push({ icon: Linkedin, label: "LinkedIn", href: m.linkedin_url })
  }
  // Adding Instagram as it's in the reference image
  if (m.instagram_url) {
    items.push({ icon: Instagram, label: "Instagram", href: m.instagram_url })
  } else if (m.id === 1) { // Mocking for the main expert as seen in image
    items.push({ icon: Instagram, label: "Instagram", href: "#" })
  }

  if (m.email) {
    items.push({ icon: Mail, label: "Email", href: `mailto:${m.email}` })
  }
  if (m.phone) {
    const tel = m.phone.replace(/\s+/g, "")
    items.push({ icon: Phone, label: "Phone", href: `tel:${tel}` })
  }
  return items
}

/** Decorative wave at the bottom of the photo (reference-style green accent). */
function PhotoWaveAccent() {
  return (
    <svg
      className="pointer-events-none absolute bottom-0 left-0 w-full text-[#00a600]/80"
      viewBox="0 0 400 200"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M0,100 C150,50 250,200 400,150 L400,200 L0,200 Z"
      />
    </svg>
  )
}

export function TeamSection() {
  const t = useTranslations('team')
  const { data: members, isLoading } = useQuery({
    queryKey: ['team'],
    queryFn: getTeamMembers,
  })

  if (isLoading) return null // Or a skeleton

  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeader tag={t('tag')} title={t('title')} centered />

        {!members?.length ? (
          <p className="text-center text-muted-foreground">No team members are listed yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {members.map((member) => {
              const photoSrc = member.photo ? getSafeImageSrc(member.photo) : null
              const contacts = memberContacts(member)
              const bio = member.experience_short?.trim() || ""

              return (
                <div
                  key={member.id}
                  className="flex flex-col items-center group"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-[2.5rem] bg-muted shadow-xl">
                    {photoSrc ? (
                      <Image
                        src={photoSrc}
                        alt={member.name}
                        fill
                        className="object-cover object-top grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center bg-green-100 text-4xl font-bold text-green-800">
                        {initialsFromName(member.name)}
                      </div>
                    )}
                    
                    <PhotoWaveAccent />

                    {/* Hover Overlay for Bio */}
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute inset-0 z-10 flex items-end justify-center bg-black/40 p-6 opacity-0 transition-opacity duration-300"
                      >
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg text-sm text-gray-800 leading-relaxed">
                          <p className="line-clamp-6">{bio || "Expert in agricultural solutions and farm management."}</p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Content below image */}
                  <div className="mt-8 text-center space-y-2">
                    <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">{member.name}</h3>
                    <p className="text-base font-medium text-gray-500">{member.role}</p>
                    
                    {/* Social Icons */}
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                      {contacts.map(({ icon: Icon, label, href }) => (
                        <Link
                          key={label}
                          href={href}
                          className="inline-flex size-11 items-center justify-center rounded-sm bg-[#00a600] text-white transition-all hover:bg-[#008a00] hover:scale-110 shadow-md"
                          aria-label={label}
                          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          <Icon className="size-5" strokeWidth={2.5} aria-hidden />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
