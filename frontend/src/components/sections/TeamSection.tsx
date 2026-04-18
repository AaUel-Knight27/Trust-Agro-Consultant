import Link from "next/link"
import { Facebook, Linkedin, Mail } from "lucide-react"

import { SectionHeader } from "@/components/shared/SectionHeader"

const members = [
  {
    name: "Dr. Abunu Andarga",
    role: "Owner and General Manager",
    initials: "AA",
  },
  {
    name: "Dr. Abunu Andarga",
    role: "Owner and Vice Manager",
    initials: "AA",
  },
] as const

const social = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Mail, label: "Email", href: "#" },
] as const

export function TeamSection() {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeader tag="The Team" title="Our Experts" centered />

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-10 sm:grid-cols-2">
          {members.map((member, index) => (
            <div
              key={`${member.role}-${index}`}
              className="flex flex-col items-center rounded-xl border border-border bg-card p-8 text-center ring-1 ring-foreground/10"
            >
              <div
                className="flex size-20 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-800"
                aria-hidden
              >
                {member.initials}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
              <div className="mt-6 flex items-center gap-4">
                {social.map(({ icon: Icon, label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="text-zinc-400 transition-colors hover:text-green-700"
                    aria-label={label}
                  >
                    <Icon size={16} aria-hidden />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
