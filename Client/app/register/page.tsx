"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { register } from "@/store/slices/auth-slice"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [degree, setDegree] = useState("B.Tech")
  const [college, setCollege] = useState("")
  const [cgpa, setCgpa] = useState("")
  const [location, setLocation] = useState("Remote")
  const dispatch = useDispatch()
  const router = useRouter()

  const canStep1 = name.trim() && /\S+@\S+\.\S+/.test(email) && password.length >= 6
  const canStep2 = degree.trim() && college.trim() && cgpa !== ""

  function submit() {
    const id = crypto.randomUUID()
    dispatch(register({ id, name, email }))
    router.push("/dashboard")
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Student Registration</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          {step === 1 && (
            <div className="grid gap-3">
              <div className="grid gap-1.5">
                <Label>Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
              </div>
              <div className="grid gap-1.5">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@college.edu"
                />
              </div>
              <div className="grid gap-1.5">
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} disabled={!canStep1}>
                  Next
                </Button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="grid gap-3">
              <div className="grid gap-1.5">
                <Label>Degree</Label>
                <Input value={degree} onChange={(e) => setDegree(e.target.value)} placeholder="e.g., B.Tech CSE" />
              </div>
              <div className="grid gap-1.5">
                <Label>College</Label>
                <Input value={college} onChange={(e) => setCollege(e.target.value)} placeholder="Your institution" />
              </div>
              <div className="grid gap-1.5">
                <Label>CGPA</Label>
                <Input value={cgpa} onChange={(e) => setCgpa(e.target.value)} placeholder="e.g., 8.2" />
              </div>
              <div className="grid gap-1.5">
                <Label>Preferred Location</Label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Bengaluru, Remote"
                />
              </div>
              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={submit} disabled={!canStep2}>
                  Create Account
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
