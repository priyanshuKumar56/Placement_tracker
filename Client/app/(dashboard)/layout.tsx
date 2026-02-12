import type React from "react"
import Nav from "@/components/nav"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
    </>
  )
}
