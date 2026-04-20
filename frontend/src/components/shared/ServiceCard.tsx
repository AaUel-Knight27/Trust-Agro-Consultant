"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  HelpCircle,
  ShoppingBasket,
  Stethoscope,
  Wheat,
  Wrench,
  Award,
  CheckCircle2,
  MapPin,
  Users,
  LucideIcon,
} from "lucide-react"
import { useTranslations } from 'next-intl'

import { Card } from "@/components/ui/card"
import { getSafeImageSrc } from '@/lib/imageUtils'
import { IMAGES } from '@/lib/images'

const iconMap: Record<string, LucideIcon> = {
  ClipboardList,
  BookOpen,
  Stethoscope,
  Wheat,
  ShoppingBasket,
  Wrench,
  Award,
  CheckCircle2,
  MapPin,
  Users,
}

export function getLucideIcon(name: string) {
  return iconMap[name] || HelpCircle
}

type ServiceCardProps = {
  title: string
  short_description: string
  icon_name: string
  slug: string
  cover_image?: string | null
}

const SERVICE_IMAGES: Record<string, string> = {
  'consulting-services':          IMAGES.serviceConsulting,
  'training-service':             IMAGES.serviceTraining,
  'veterinary-medical-service':   IMAGES.serviceVeterinary,
  'animal-feed':                  IMAGES.serviceAnimalFeed,
  'sale-of-farm-products':        IMAGES.serviceFarmProducts,
  'animal-husbandry-equipment':   IMAGES.serviceEquipment,
}

export function ServiceCard({ title, short_description, icon_name, slug, cover_image }: ServiceCardProps) {
  const t = useTranslations('services')
  const Icon = getLucideIcon(icon_name)
  const safeCover = getSafeImageSrc(cover_image)
  const imageSrc = safeCover || SERVICE_IMAGES[slug] || IMAGES.aboutFarm

  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl 
                     transition-all duration-300 cursor-pointer">
      <Link href={`/services/${slug}`}>

        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

          {/* Icon badge */}
          <div className="absolute top-4 left-4 bg-green-700 text-white 
                          rounded-lg p-2 shadow-lg">
            <Icon size={18} />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-green-700 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {short_description}
          </p>
          <div className="flex items-center gap-1 text-green-700 text-sm font-medium">
            {t('readMore')} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>

      </Link>
    </Card>
  )
}
