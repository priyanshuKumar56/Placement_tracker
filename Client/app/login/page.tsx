"use client"

import type React from "react"

import { useDispatch } from "react-redux"
import { login } from "@/store/slices/auth-slice"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const dispatch = useDispatch()
  const router = useRouter()

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    dispatch(login({ id: crypto.randomUUID(), email, name: name || email.split("@")[0] }))
    router.push("/dashboard")
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Local session only</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-4">
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Button type="submit">Login</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
