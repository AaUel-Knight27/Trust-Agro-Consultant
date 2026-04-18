import { AboutSnippetSection } from "@/components/sections/AboutSnippetSection"
import { CollaborationsSection } from "@/components/sections/CollaborationsSection"
import { CoreValuesSection } from "@/components/sections/CoreValuesSection"
import { CTASection } from "@/components/sections/CTASection"
import { FAQSection } from "@/components/sections/FAQSection"
import { HeroSection } from "@/components/sections/HeroSection"
import { ServicesSection } from "@/components/sections/ServicesSection"
import { StatsSection } from "@/components/sections/StatsSection"
import { TeamSection } from "@/components/sections/TeamSection"

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSnippetSection />
      <ServicesSection />
      <CoreValuesSection />
      <TeamSection />
      <CollaborationsSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
