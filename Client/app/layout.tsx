import type React from "react"
import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import StoreProvider from "@/store/provider"
import Nav from "@/components/nav"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"

export const metadata: Metadata = {
  title: "placementHub",

  
}

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["700"],
})
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400", "600"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable} ${GeistMono.variable} antialiased`}>
      <body className="font-sans">
        <StoreProvider>
          <Suspense fallback={null}>
            <Nav />
            {children}
          </Suspense>
        </StoreProvider>
        <Analytics />
      </body>
    </html>
  )
}
