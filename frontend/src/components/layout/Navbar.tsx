"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
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
      <Wheat className="size-7 shrink-0 text-green-600" strokeWidth={2} aria-hidden />
      <span className="font-semibold">Trust Agro Consult</span>
    </Link>
  )
}

export function Navbar() {
  const scrolled = useScrolled(10)
  const [mobileOpen, setMobileOpen] = useState(false)

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
                  <NavigationMenuLink render={<Link href="/" />} className="h-9 px-2.5 py-1.5">
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-[min(100vw-2rem,20rem)] p-2">
                    <ul className="flex flex-col gap-0.5">
                      {services.map(({ href, label, icon: Icon }) => (
                        <li key={href}>
                          <NavigationMenuLink
                            render={<Link href={href} />}
                            className="w-full justify-start gap-2"
                            closeOnClick
                          >
                            <Icon className="size-4 shrink-0 text-muted-foreground" />
                            {label}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink render={<Link href="/blog" />} className="h-9 px-2.5 py-1.5">
                    News & Blog
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink render={<Link href="/about" />} className="h-9 px-2.5 py-1.5">
                    About
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink render={<Link href="/contact" />} className="h-9 px-2.5 py-1.5">
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<a href="tel:+251919076607" />}
            >
              <Phone size={14} className="mr-1" />
              +251 919 076 607
            </Button>
            <Button
              size="sm"
              nativeButton={false}
              className="bg-green-700 text-white hover:bg-green-800"
              render={<Link href="/contact" />}
            >
              <CalendarCheck size={14} className="mr-1" />
              Book Consulting
            </Button>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex w-full items-center justify-between md:hidden">
          <LogoMark />
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
                  className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
                  onClick={() => setMobileOpen(false)}
                >
                  Home
                </Link>

                <div className="flex items-center gap-1 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Services
                  <ChevronDown className="size-3" aria-hidden />
                </div>
                {services.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-muted"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon className="size-4 shrink-0 text-muted-foreground" />
                    {label}
                  </Link>
                ))}

                <Link
                  href="/blog"
                  className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
                  onClick={() => setMobileOpen(false)}
                >
                  News & Blog
                </Link>
                <Link
                  href="/about"
                  className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
                  onClick={() => setMobileOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact
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
                  Book Consulting
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
