import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

import "./globals.css"
import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import { ScrollToTop } from "@/components/shared/ScrollToTop"
import { WhatsAppButton } from "@/components/shared/WhatsAppButton"
import { QueryProvider } from "@/providers/QueryProvider"
import { ThemeProvider } from "@/providers/ThemeProvider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Trust Agro Consult",
  description: "Agricultural consulting and training in Ethiopia",
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider>
            <QueryProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <WhatsAppButton />
              <ScrollToTop />
            </QueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
