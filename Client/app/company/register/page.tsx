"use client"

import { useDispatch } from "react-redux"
import { companyRegister } from "@/store/slices/company-auth-slice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function CompanyRegisterPage() {
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  return (
    <main className="mx-auto max-w-sm p-6"> 
      <Card>
        <CardHeader>
          <CardTitle>Create Company Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Company name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Work email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button
            onClick={() => {
              if (!name || !email) return
              dispatch(companyRegister({ name, email }))
              window.location.href = "/company/dashboard"
            }}
          >
            Create
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
