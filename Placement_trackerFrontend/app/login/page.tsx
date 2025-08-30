"use client"

import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDispatch } from "react-redux"
import { login } from "@/lib/slices/auth-slice"
import { type FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      dispatch(login({ email, password }))
      const role = JSON.parse(localStorage.getItem("placement-tracker-state-v1") || "{}")?.auth?.currentUser?.role as
        | "student"
        | "admin"
        | "company"
        | undefined
      if (role === "admin") router.replace("/admin/dashboard")
      else if (role === "company") router.replace("/company/dashboard")
      else router.replace("/student/dashboard")
    } catch (err: any) {
      setError(err.message || "Login failed")
    }
  }

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-md px-4 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Use your email and password to continue.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={onSubmit}>
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit">Continue</Button>
            </form>
            <p className="mt-4 text-sm text-muted-foreground">
              No account?{" "}
              <a href="/register" className="text-primary hover:underline">
                Register
              </a>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
