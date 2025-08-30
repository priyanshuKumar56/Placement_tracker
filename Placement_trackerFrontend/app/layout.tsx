import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import ReduxProvider from "@/providers/redux-provider"

export const metadata: Metadata = {
  title: "Placement Tracker",


}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ReduxProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </ReduxProvider>
        <Analytics />
      </body>
    </html>
  )
}
