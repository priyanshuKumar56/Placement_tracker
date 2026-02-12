"use client"

import { useDispatch } from "react-redux"
import { companyLogin } from "@/store/slices/company-auth-slice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function CompanyLoginPage() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")

  return (
    <main className="mx-auto max-w-sm p-6">
      <Card>
        <CardHeader>
          <CardTitle>Recruiter Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Work email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button
            onClick={() => {
              if (!email) return
              dispatch(companyLogin({ email }))
              window.location.href = "/company/dashboard"
            }}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
