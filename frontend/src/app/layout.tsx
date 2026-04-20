import type { Metadata } from "next"
import { Inter } from "next/font/google"

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <QueryProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
            <ScrollToTop />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
