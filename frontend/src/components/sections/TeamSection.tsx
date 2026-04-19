"use client"

import Image from "next/image"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { Facebook, Linkedin, Mail, Phone } from "lucide-react"

import { SectionHeader } from "@/components/shared/SectionHeader"
import { Skeleton } from "@/components/ui/skeleton"
import { getTeamMembers } from "@/lib/api"
import { resolveMediaUrl } from "@/lib/mediaUrl"
import type { TeamMember } from "@/types"

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
  const items: { icon: typeof Facebook; label: string; href: string }[] = []
  if (m.facebook_url) {
    items.push({ icon: Facebook, label: "Facebook", href: m.facebook_url })
  }
  if (m.linkedin_url) {
    items.push({ icon: Linkedin, label: "LinkedIn", href: m.linkedin_url })
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
      className="pointer-events-none absolute bottom-0 left-0 w-[92%] text-[#15803d]"
      viewBox="0 0 400 120"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        fill="currentColor"
        fillOpacity={0.92}
        d="M0,80 C60,40 120,100 200,55 C260,25 320,75 400,45 L400,120 L0,120 Z"
      />
    </svg>
  )
}

function MemberCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card ring-1 ring-foreground/10">
      <Skeleton className="aspect-[3/4] w-full rounded-none rounded-t-xl" />
      <div className="space-y-3 px-6 pb-8 pt-6 text-center">
        <Skeleton className="mx-auto h-6 w-40" />
        <Skeleton className="mx-auto h-4 w-52" />
        <div className="mt-4 flex justify-center gap-2">
          <Skeleton className="size-9 rounded-sm" />
          <Skeleton className="size-9 rounded-sm" />
          <Skeleton className="size-9 rounded-sm" />
        </div>
      </div>
    </div>
  )
}

export function TeamSection() {
  const { data: members, isLoading, isError } = useQuery({
    queryKey: ["team"],
    queryFn: getTeamMembers,
  })

  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeader tag="The Team" title="Our Experts" centered />

        {isError ? (
          <p className="text-center text-muted-foreground">
            We couldn&apos;t load the team right now. Please try again later.
          </p>
        ) : isLoading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <MemberCardSkeleton />
            <MemberCardSkeleton />
            <MemberCardSkeleton />
            <MemberCardSkeleton />
          </div>
        ) : !members?.length ? (
          <p className="text-center text-muted-foreground">No team members are listed yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((member) => {
              const photoSrc = resolveMediaUrl(member.photo)
              const contacts = memberContacts(member)
              const hoverNote = member.experience_short.trim()

              return (
                <div
                  key={member.id}
                  className="flex flex-col overflow-hidden rounded-xl border border-border bg-card text-center ring-1 ring-foreground/10"
                >
                  <div
                    className="relative aspect-[3/4] w-full cursor-help overflow-hidden bg-muted"
                    title={hoverNote || undefined}
                  >
                    {photoSrc ? (
                      <Image
                        src={photoSrc}
                        alt={member.name}
                        fill
                        className="object-cover object-top grayscale"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center bg-green-100 text-4xl font-bold text-green-800">
                        {initialsFromName(member.name)}
                      </div>
                    )}
                    <PhotoWaveAccent />
                  </div>
                  <div className="flex flex-1 flex-col px-6 pb-8 pt-6">
                    <h3 className="text-lg font-semibold leading-snug">{member.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{member.role}</p>
                    {contacts.length > 0 ? (
                      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                        {contacts.map(({ icon: Icon, label, href }) => (
                          <Link
                            key={label}
                            href={href}
                            className="inline-flex size-9 items-center justify-center rounded-sm bg-green-700 text-white transition-colors hover:bg-green-800"
                            aria-label={label}
                            {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          >
                            <Icon className="size-4" strokeWidth={2} aria-hidden />
                          </Link>
                        ))}
                      </div>
                    ) : null}
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
