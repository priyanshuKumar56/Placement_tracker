"use client"

import Navbar from "@/components/navbar"
import Link from "next/link"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CompanyDashboard() {
  const { currentUser } = useSelector((s: RootState) => s.auth)
  const allJobs = useSelector((s: RootState) => s.jobs.items)
  const jobs = allJobs.filter((j) => j.postedBy === currentUser?.id)

  if (!currentUser || currentUser.role !== "company") {
    return (
      <div>
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Company Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Please login as a company member to access the dashboard.
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  const stats = {
    total: jobs.length,
    approved: jobs.filter((j) => j.approved).length,
    pending: jobs.filter((j) => !j.approved).length,
  }

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h1 className="text-2xl font-semibold">Company Dashboard</h1>
          <Link
            href="/company/jobs/new"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Post a Job
          </Link>
        </div>

        {/* Metrics */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{stats.approved}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{stats.pending}</div>
            </CardContent>
          </Card>
        </section>

        {/* Listings */}
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-medium">Your Postings</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {jobs.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-sm text-muted-foreground">
                  No postings yet. Click “Post a Job” to create your first opening.
                </CardContent>
              </Card>
            ) : (
              jobs.map((j) => (
                <Card key={j.id} className="transition-all hover:-translate-y-0.5 hover:shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{j.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
                    <div>
                      {j.company} • {j.location} • {j.type}
                    </div>
                    <Badge variant={j.approved ? "default" : "secondary"}>{j.approved ? "Approved" : "Pending"}</Badge>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
