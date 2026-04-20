"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslations } from 'next-intl'
import {
  BookOpen,
  CalendarCheck,
  ChevronDown,
  ClipboardList,
  Mail,
  Menu,
  Phone,
  ShoppingBasket,
  Stethoscope,
  Wheat,
  Wrench,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher"
import { useScrolled } from "@/hooks/useScrolled"
import { cn } from "@/lib/utils"

const services = [
  {
    href: "/services/consulting-services",
    label: "Consulting Services",
    icon: ClipboardList,
  },
  {
    href: "/services/training-service",
    label: "Training Service",
    icon: BookOpen,
  },
  {
    href: "/services/veterinary-medical-service",
    label: "Veterinary Medical Service",
    icon: Stethoscope,
  },
  {
    href: "/services/animal-feed",
    label: "Animal Feed",
    icon: Wheat,
  },
  {
    href: "/services/sale-of-farm-products",
    label: "Sale of Farm Products",
    icon: ShoppingBasket,
  },
  {
    href: "/services/animal-husbandry-equipment",
    label: "Animal Husbandry Equipment",
    icon: Wrench,
  },
] as const

function LogoMark() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <motion.div 
        whileHover={{ scale: 1.03 }} 
        transition={{ duration: 0.2 }}
        className="flex items-center gap-2"
      >
        <Wheat className="size-7 shrink-0 text-green-600" strokeWidth={2} aria-hidden />
        <span className="font-semibold">Trust Agro Consult</span>
      </motion.div>
    </Link>
  )
}

export function Navbar() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const scrolled = useScrolled(10)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/' && pathname !== '/') return false
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "border-b border-border bg-background/95 shadow-sm backdrop-blur"
          : "bg-background"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Desktop */}
        <div className="hidden w-full items-center gap-4 md:flex">
          <div className="shrink-0">
            <LogoMark />
          </div>

          <div className="flex flex-1 justify-center">
            <NavigationMenu className="max-w-none">
              <NavigationMenuList className="flex-wrap justify-center gap-0">
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    render={<Link href="/" />} 
                    className={cn(
                      "h-9 px-2.5 py-1.5 transition-colors hover:text-green-700",
                      isActive("/") && "text-green-700 font-medium"
                    )}
                  >
                    {t('home')}
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>{t('services')}</NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-[min(100vw-2rem,20rem)] p-2">
                    <ul className="flex flex-col gap-0.5">
                      {services.map(({ href, label, icon: Icon }) => (
                        <li key={href}>
                          <NavigationMenuLink
                            render={<Link href={href} />}
                            className={cn(
                              "w-full justify-start gap-2 transition-colors",
                              isActive(href) && "bg-muted text-green-700 font-medium"
                            )}
                            closeOnClick
                          >
                            <Icon className={cn("size-4 shrink-0", isActive(href) ? "text-green-600" : "text-muted-foreground")} />
                            {label}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink 
                    render={<Link href="/gallery" />} 
                    className={cn(
                      "h-9 px-2.5 py-1.5 transition-colors hover:text-green-700",
                      isActive("/gallery") && "text-green-700 font-medium"
                    )}
                  >
                    {t('gallery')}
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink 
                    render={<Link href="/about" />} 
                    className={cn(
                      "h-9 px-2.5 py-1.5 transition-colors hover:text-green-700",
                      isActive("/about") && "text-green-700 font-medium"
                    )}
                  >
                    {t('about')}
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink 
                    render={<Link href="/contact" />} 
                    className={cn(
                      "h-9 px-2.5 py-1.5 transition-colors hover:text-green-700",
                      isActive("/contact") && "text-green-700 font-medium"
                    )}
                  >
                    {t('contact')}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<a href="tel:+251919076607" />}
            >
              <Phone size={14} className="mr-1" />
              {t('callUs')}
            </Button>
            <Button
              size="sm"
              nativeButton={false}
              className="bg-green-700 text-white hover:bg-green-800"
              render={<Link href="/contact" />}
            >
              <CalendarCheck size={14} className="mr-1" />
              {t('bookConsulting')}
            </Button>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex w-full items-center justify-between gap-2 md:hidden">
          <LogoMark />
          <div className="flex shrink-0 items-center gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                nativeButton={false}
                render={<Button variant="ghost" size="icon-sm" aria-label="Open menu" />}
              >
                <Menu className="size-5" />
              </SheetTrigger>
              <SheetContent side="left" className="flex w-full max-w-sm flex-col gap-0 p-0">
                <div className="flex items-center gap-3 border-b px-4 py-4">
                  <Image
                    src="/logo.svg"
                    width={32}
                    height={32}
                    alt=""
                    className="shrink-0"
                    aria-hidden
                  />
                  <span className="font-semibold">Trust Agro Consult</span>
                </div>
                <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
                  <Link
                    href="/"
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted transition-colors",
                      isActive("/") && "bg-muted text-green-700"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {t('home')}
                  </Link>

                  <div className="flex items-center gap-1 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t('services')}
                    <ChevronDown className="size-3" aria-hidden />
                  </div>
                  {services.map(({ href, label, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-muted transition-colors",
                        isActive(href) && "bg-muted text-green-700 font-medium"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon className={cn("size-4 shrink-0", isActive(href) ? "text-green-600" : "text-muted-foreground")} />
                      {label}
                    </Link>
                  ))}

                  <Link
                    href="/gallery"
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted transition-colors",
                      isActive("/gallery") && "bg-muted text-green-700"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {t('gallery')}
                  </Link>
                  <Link
                    href="/about"
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted transition-colors",
                      isActive("/about") && "bg-muted text-green-700"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {t('about')}
                  </Link>
                  <Link
                    href="/contact"
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted transition-colors",
                      isActive("/contact") && "bg-muted text-green-700"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {t('contact')}
                  </Link>
                </nav>

                <div className="mt-auto flex flex-col gap-3 border-t p-4">
                  <a
                    href="mailto:info@trustagroconsult.com"
                    className="text-muted-foreground flex items-center text-sm hover:text-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Mail size={14} className="mr-2 text-green-600" />
                    info@trustagroconsult.com
                  </a>
                  <Button
                    size="sm"
                    nativeButton={false}
                    className="w-full bg-green-700 text-white hover:bg-green-800"
                    render={<Link href="/contact" onClick={() => setMobileOpen(false)} />}
                  >
                    <CalendarCheck size={14} className="mr-1" />
                    {t('bookConsulting')}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
