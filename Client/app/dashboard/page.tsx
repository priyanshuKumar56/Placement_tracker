"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const user = useSelector((s: RootState) => s.auth.user)
  const apps = useSelector((s: RootState) => s.applications.items)
  const notifications = useSelector((s: RootState) => s.notifications.items)
  const jobs = useSelector((s: RootState) => s.jobs.items)

  const quickStats = {
    applied: apps.length,
    shortlisted: apps.filter((a) => a.status === "shortlisted").length,
    offers: apps.filter((a) => a.status === "hired").length,
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-semibold text-balance">Hello {user?.name || "Student"}</h1>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Applied</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{quickStats.applied}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Shortlisted</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{quickStats.shortlisted}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Offers</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{quickStats.offers}</CardContent>
        </Card>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        <Card className="transition-colors hover:bg-accent/50">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <div className="font-medium">Build Resume</div>
              <div className="text-sm text-muted-foreground">Create or import</div>
            </div>
            <Link href="/resume">
              <Button size="sm">Open</Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="transition-colors hover:bg-accent/50">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <div className="font-medium">My Applications</div>
              <div className="text-sm text-muted-foreground">Track status</div>
            </div>
            <Link href="/applications">
              <Button size="sm" variant="secondary">
                View
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="transition-colors hover:bg-accent/50">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <div className="font-medium">Browse Jobs</div>
              <div className="text-sm text-muted-foreground">Latest openings</div>
            </div>
            <Link href="/jobs">
              <Button size="sm" variant="outline">
                Explore
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="transition-colors hover:bg-accent/50">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <div className="font-medium">Practice & Tests</div>
              <div className="text-sm text-muted-foreground">Aptitude, coding</div>
            </div>
            <Link href="/prep">
              <Button size="sm" variant="secondary">
                Start
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="transition-colors hover:bg-accent/50">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <div className="font-medium">Edit Profile</div>
              <div className="text-sm text-muted-foreground">Update details</div>
            </div>
            <Link href="/profile">
              <Button size="sm" variant="outline">
                Edit
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {apps.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No applications yet. Explore{" "}
                <Link href="/jobs" className="text-primary underline">
                  Jobs
                </Link>
                .
              </p>
            ) : (
              apps.slice(0, 5).map((a) => (
                <div key={a.id} className="rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">
                      {a.jobTitle} <span className="text-muted-foreground">• {a.company}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{new Date(a.submittedAt).toLocaleString()}</span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground capitalize">
                    Status: {a.status.replace("_", " ")}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {jobs.length === 0 && <p className="text-sm text-muted-foreground">No notifications yet.</p>}
            {/* In a real app, this would be populated via notifications slice */}
            <p className="text-sm text-muted-foreground">Stay tuned for updates on your applications.</p>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
