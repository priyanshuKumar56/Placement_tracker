"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { register as registerAction } from "@/lib/slices/auth-slice"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"

export default function AdminRegister() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [institute, setInstitute] = useState("")
  const [department, setDepartment] = useState("")

  const canSubmit = name && /\S+@\S+\.\S+/.test(email) && password.length >= 6 && institute

  function submit() {
    if (!canSubmit) return
    try {
      dispatch(registerAction({ role: "admin", name, email, password } as any))
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
            <CardTitle>TPO / Admin Registration</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input type="email" placeholder="Official Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input
              type="password"
              placeholder="Password (min 6 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input placeholder="Institute" value={institute} onChange={(e) => setInstitute(e.target.value)} />
            <Input placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
            <div className="flex justify-end">
              <Button onClick={submit} disabled={!canSubmit}>
                Create Admin Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
