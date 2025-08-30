"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { register as registerAction } from "@/lib/slices/auth-slice"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"

export default function CompanyRegister() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [company, setCompany] = useState("")
  const [website, setWebsite] = useState("")
  const [size, setSize] = useState("1-50")

  const canSubmit = name && /\S+@\S+\.\S+/.test(email) && password.length >= 6 && company

  function submit() {
    if (!canSubmit) return
    try {
      dispatch(registerAction({ role: "company", name, email, password } as any))
      router.push("/profile")
    } catch (e: any) {
      alert(e.message || "Failed to register")
    }
  }

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-xl px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Company Registration</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Work Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input
              placeholder="Password (min 6 chars)"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
            <Input placeholder="Website" value={website} onChange={(e) => setWebsite(e.target.value)} />
            <Input placeholder="Size (e.g., 1-50)" value={size} onChange={(e) => setSize(e.target.value)} />
            <div className="flex justify-end">
              <Button onClick={submit} disabled={!canSubmit}>
                Create Company Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
