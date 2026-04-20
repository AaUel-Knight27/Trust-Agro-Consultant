import Link from "next/link"
import { Mail, MapPin, Phone, Wheat } from "lucide-react"

import { Separator } from "@/components/ui/separator"

const services = [
  { href: "/services/consulting-services", label: "Consulting Services" },
  { href: "/services/training-service", label: "Training Service" },
  { href: "/services/veterinary-medical-service", label: "Veterinary Medical Service" },
  { href: "/services/animal-feed", label: "Animal Feed" },
  { href: "/services/sale-of-farm-products", label: "Sale of Farm Products" },
  { href: "/services/animal-husbandry-equipment", label: "Animal Husbandry Equipment" },
] as const

export function Footer() {
  return (
    <footer className="bg-zinc-900 px-6 py-16 text-zinc-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Wheat className="size-8 shrink-0 text-green-500" aria-hidden />
            <h3 className="text-lg font-semibold leading-tight">Trust Agro Consult</h3>
          </div>
          <p className="text-sm text-zinc-400">
            Professional agricultural consulting and training services across Ethiopia since 2021.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Our Services</h4>
          <ul className="flex flex-col gap-2">
            {services.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-zinc-300 transition-colors hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Quick Links</h4>
          <ul className="flex flex-col gap-2">
            <li><Link href="/" className="text-sm text-zinc-300 transition-colors hover:text-white">Home</Link></li>
            <li><Link href="/gallery" className="text-sm text-zinc-300 transition-colors hover:text-white">Gallery</Link></li>
            <li><Link href="/blog" className="text-sm text-zinc-300 transition-colors hover:text-white">News & Blog</Link></li>
            <li><Link href="/about" className="text-sm text-zinc-300 transition-colors hover:text-white">About Us</Link></li>
            <li><Link href="/contact" className="text-sm text-zinc-300 transition-colors hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
            Get In Touch
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-zinc-300">
            <li className="flex items-start">
              <MapPin size={14} className="mr-2 mt-0.5 shrink-0 text-green-500" aria-hidden />
              Addis Ababa, Ethiopia
            </li>
            <li className="flex items-center">
              <Phone size={14} className="mr-2 shrink-0 text-green-500" aria-hidden />
              <a href="tel:+251919076607" className="transition-colors hover:text-white">
                +251 919 076 607
              </a>
            </li>
            <li className="flex items-center">
              <Mail size={14} className="mr-2 shrink-0 text-green-500" aria-hidden />
              <a
                href="mailto:info@trustagroconsult.com"
                className="transition-colors hover:text-white"
              >
                info@trustagroconsult.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <Separator className="mx-auto mt-12 max-w-7xl bg-zinc-800" />

      <div className="mx-auto max-w-7xl">
        <p className="py-4 text-center text-xs text-zinc-500">
          © 2026 Trust Agro Consult P.L.C. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
