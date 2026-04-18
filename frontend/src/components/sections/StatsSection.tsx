import { Award, CheckCircle2, MapPin, Users } from "lucide-react"

const stats = [
  { value: "10+", label: "Locations", icon: MapPin },
  { value: "500+", label: "Trained Farmers", icon: Users },
  { value: "50+", label: "Successful Projects", icon: CheckCircle2 },
  { value: "3+", label: "Years of Experience", icon: Award },
] as const

export function StatsSection() {
  return (
    <section className="bg-green-700 py-20 px-6 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4 md:gap-0 md:divide-x md:divide-white/20">
        {stats.map(({ value, label, icon: Icon }) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center px-4 py-4 text-center md:py-2"
          >
            <Icon className="mb-3 size-8 text-white/90" strokeWidth={1.5} aria-hidden />
            <p className="text-4xl font-bold tracking-tight md:text-5xl">{value}</p>
            <p className="mt-2 text-sm font-medium text-white/90">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
