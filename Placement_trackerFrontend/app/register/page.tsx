"use client"

import Navbar from "@/components/navbar"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>Select your role to continue with a tailored registration flow.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-md border p-4">
                <h3 className="mb-1 font-medium">Student</h3>
                <p className="mb-3 text-sm text-muted-foreground">Multi-step: Account → Education → Preferences</p>
                <Link href="/register/student">
                  <Button className="w-full">Continue as Student</Button>
                </Link>
              </div>
              <div className="rounded-md border p-4">
                <h3 className="mb-1 font-medium">TPO / Admin</h3>
                <p className="mb-3 text-sm text-muted-foreground">Institute details and admin access</p>
                <Link href="/register/admin">
                  <Button className="w-full bg-transparent" variant="outline">
                    Continue as Admin
                  </Button>
                </Link>
              </div>
              <div className="rounded-md border p-4">
                <h3 className="mb-1 font-medium">Company / Recruiter</h3>
                <p className="mb-3 text-sm text-muted-foreground">Create a recruiter account to post jobs</p>
                <Link href="/register/company">
                  <Button className="w-full" variant="secondary">
                    Continue as Company
                  </Button>
                </Link>
              </div>
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
