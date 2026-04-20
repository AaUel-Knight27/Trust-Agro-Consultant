import Image from "next/image"

import { CollaborationsSection } from "@/components/sections/CollaborationsSection"
import { CTASection } from "@/components/sections/CTASection"
import { StatsSection } from "@/components/sections/StatsSection"
import { TeamSection } from "@/components/sections/TeamSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { PageTransition } from "@/components/shared/PageTransition"
import { IMAGES } from "@/lib/images"

export default function AboutPage() {
  return (
    <PageTransition>
      {/* Hero with background image */}
      <section className="relative py-40 px-6 overflow-hidden">
        <Image src={IMAGES.greenFields} alt="Farm fields" fill 
               className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-zinc-900/70" />
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto">
          <p className="text-green-400 text-xs uppercase tracking-widest mb-4 font-semibold">
            Our Story
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-zinc-300">
            Learn how Trust Agro Consult supports Ethiopian farmers with evidence-based advisory services
            and practical training.
          </p>
        </div>
      </section>

      {/* Historical background — image + text side by side */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <div className="space-y-6">
            <SectionHeader tag="Our History" title="Historical Background" />
            <div className="space-y-4 text-zinc-600 leading-relaxed">
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

          {/* Image grid — 2x2 collage */}
          <div className="grid grid-cols-2 gap-4">
            {[IMAGES.livestock, IMAGES.poultry, IMAGES.dairy, IMAGES.farmWorker].map((src, i) => (
              <div key={i} className={`relative rounded-xl overflow-hidden shadow-md
                                       ${i === 0 ? 'h-56' : 'h-44'}`}>
                <Image src={src} alt="Trust Agro farm" fill 
                       className="object-cover hover:scale-105 transition-transform duration-500"
                       sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            ))}
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
