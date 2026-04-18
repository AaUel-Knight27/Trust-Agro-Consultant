import Link from "next/link"
import { ArrowRight, Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/shared/SectionHeader"

export function AboutSnippetSection() {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <SectionHeader tag="About Us" title="Who We Are" />
          <p className="text-muted-foreground leading-relaxed">
            Agro Consulting P.L.C was established in 2021 by veterinary physicians with extensive
            experience in medium and large farms. Our organization is a multidisciplinary agricultural
            consulting business with operations across Ethiopia, founded in Bishoftu City.
          </p>
          <Button variant="outline" nativeButton={false} render={<Link href="/about" />}>
            Read More
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
        <div className="flex aspect-video items-center justify-center rounded-xl bg-zinc-100">
          <Leaf className="size-16 text-green-300" strokeWidth={1.25} aria-hidden />
        </div>
      </div>
    </section>
  )
}
