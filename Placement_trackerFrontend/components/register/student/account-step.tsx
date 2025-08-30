"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React from "react"

export function AccountStep({
  name,
  email,
  password,
  onName,
  onEmail,
  onPassword,
  onNext,
  canContinue,
}: {
  name: string
  email: string
  password: string
  onName: (v: string) => void
  onEmail: (v: string) => void
  onPassword: (v: string) => void
  onNext: () => void
  canContinue: boolean
}) {
  const [touched, setTouched] = React.useState<{ name?: boolean; email?: boolean; password?: boolean }>({})

  const emailValid = /\S+@\S+\.\S+/.test(email)
  const passValid = password.length >= 6

  return (
    <div className="grid gap-3">
      <div>
        <label className="mb-1 block text-sm font-medium">Full Name</label>
        <Input
          placeholder="e.g., Priya Sharma"
          value={name}
          onChange={(e) => onName(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          aria-invalid={touched.name && !name ? "true" : "false"}
        />
        {touched.name && !name && <p className="mt-1 text-xs text-red-600">Name is required.</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => onEmail(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          aria-invalid={touched.email && !emailValid ? "true" : "false"}
        />
        {touched.email && !emailValid && <p className="mt-1 text-xs text-red-600">Enter a valid email.</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Password</label>
        <Input
          type="password"
          placeholder="Min 6 characters"
          value={password}
          onChange={(e) => onPassword(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
          aria-invalid={touched.password && !passValid ? "true" : "false"}
        />
        {touched.password && !passValid && (
          <p className="mt-1 text-xs text-red-600">Password must be at least 6 characters.</p>
        )}
      </div>

      <div className="flex items-center justify-end">
        <Button onClick={onNext} disabled={!canContinue}>
          Continue
        </Button>
      </div>
    </div>
  )
}
