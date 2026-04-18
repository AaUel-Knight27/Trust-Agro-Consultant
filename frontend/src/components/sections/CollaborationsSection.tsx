import { Building2 } from "lucide-react"

import { SectionHeader } from "@/components/shared/SectionHeader"

const partners = [
  "Kinn Ethiopia Association",
  "Tana Fiberglass Industry",
  "Redeem The Generation NGO",
] as const

export function CollaborationsSection() {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeader tag="Trust and Worth" title="Notable Collaborations" centered />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {partners.map((name) => (
            <div
              key={name}
              className="grayscale transition-all hover:grayscale-0"
            >
              <div className="flex items-center gap-3 rounded-lg border border-border p-6">
                <Building2 className="size-5 shrink-0 text-green-600" aria-hidden />
                <p className="text-sm font-medium">{name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
