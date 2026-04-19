import { Leaf } from "lucide-react"

import { CollaborationsSection } from "@/components/sections/CollaborationsSection"
import { CTASection } from "@/components/sections/CTASection"
import { StatsSection } from "@/components/sections/StatsSection"
import { TeamSection } from "@/components/sections/TeamSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { PageTransition } from "@/components/shared/PageTransition"

export default function AboutPage() {
  return (
    <PageTransition>
      <section className="bg-zinc-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">About Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-300">
            Learn how Trust Agro Consult supports Ethiopian farmers with evidence-based advisory services
            and practical training.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-start">
          <div className="space-y-6">
            <SectionHeader tag="About Us" title="Historical Background" />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Trust Agro Consult P.L.C. was founded in Bishoftu City in 2021 by veterinary physicians
                who had spent years supporting medium and large-scale farms across Ethiopia. What began
                as field experience and informal advisory work grew into a structured consulting practice
                focused on animal health, productivity, and sustainable farm management.
              </p>
              <p>
                From the outset, the team combined clinical veterinary knowledge with agronomic insight,
                recognizing that successful farms depend on aligned decisions across nutrition, housing,
                disease prevention, and market access. That multidisciplinary perspective remains central
                to how we work with clients today.
              </p>
              <p>
                As operations expanded beyond Bishoftu, Trust Agro built partnerships with producers,
                cooperatives, and institutions nationwide. Each engagement reinforced a simple principle:
                practical recommendations, delivered with respect for local conditions and the people who
                steward the land.
              </p>
            </div>
          </div>
          <div className="flex aspect-video items-center justify-center rounded-xl bg-muted">
            <Leaf className="size-16 text-green-300" strokeWidth={1.25} aria-hidden />
          </div>
        </div>
      </section>

      <StatsSection />
      <TeamSection />
      <CollaborationsSection />
      <CTASection />
    </PageTransition>
  )
}
