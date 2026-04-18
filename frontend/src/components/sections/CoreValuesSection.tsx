import { Handshake, Heart, HeartHandshake, Zap } from "lucide-react"

import { SectionHeader } from "@/components/shared/SectionHeader"

const values = [
  {
    icon: Heart,
    title: "Respect",
    desc: "Showing respect to prior generations and learning from them.",
  },
  {
    icon: Handshake,
    title: "Humility",
    desc: "Being confident yet humble in our approach to every client.",
  },
  {
    icon: Zap,
    title: "Empowerment",
    desc: "Encouraging the youth to realize their potential for national development.",
  },
  {
    icon: HeartHandshake,
    title: "Compassion",
    desc: "Demonstrating love and compassion for the next generation of farmers.",
  },
] as const

export function CoreValuesSection() {
  return (
    <section className="bg-zinc-50 py-20 px-6">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeader tag="Our Foundation" title="Core Values" centered />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600">
                <Icon className="size-6" aria-hidden />
              </div>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
