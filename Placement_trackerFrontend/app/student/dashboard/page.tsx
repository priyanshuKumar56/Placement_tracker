"use client"

import Navbar from "@/components/navbar"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ApplicationTimeline } from "@/components/application-timeline"
import Link from "next/link"

export default function StudentDashboard() {
  const { currentUser } = useSelector((s: RootState) => s.auth)
  const apps = useSelector((s: RootState) => s.applications.items).filter((a) => a.userId === currentUser?.id)
  const notifications = useSelector((s: RootState) => s.notifications.items).filter((n) => n.userId === currentUser?.id)
  const jobs = useSelector((s: RootState) => s.jobs.items)

  const quickStats = {
    applied: apps.length,
    upcoming: apps.filter((a) => a.stage === "test" || a.stage === "interview").length,
    offers: apps.filter((a) => a.stage === "offer" || a.stage === "joined").length,
  }

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-4 text-2xl font-semibold">Student Dashboard</h1>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Applied</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{quickStats.applied}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{quickStats.upcoming}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Offers</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{quickStats.offers}</CardContent>
          </Card>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Applications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {apps.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  You haven't applied yet. Explore{" "}
                  <a href="/jobs" className="text-primary hover:underline">
                    Jobs
                  </a>
                  .
                </p>
              ) : (
                apps.map((a) => {
                  const job = jobs.find((j) => j.id === a.jobId)
                  return (
                    <div key={a.id} className="rounded-md border p-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">
                          {job?.title} <span className="text-muted-foreground">• {job?.company}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(a.timestamps[a.stage] || Date.now()).toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-2">
                        <ApplicationTimeline current={a.stage} />
                      </div>
                    </div>
                  )
                })
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.length === 0 ? (
                <p className="text-sm text-muted-foreground">No notifications yet.</p>
              ) : (
                notifications.map((n) => (
                  <div key={n.id} className="rounded-md border p-3">
                    <div className="font-medium">{n.title}</div>
                    <div className="text-sm text-muted-foreground">{n.message}</div>
                    <div className="text-xs text-muted-foreground">{new Date(n.createdAt).toLocaleString()}</div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Resume Builder</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm text-muted-foreground">Create and manage resume versions.</p>
              <Link href="/student/resume-builder" className="text-primary hover:underline">
                Open Resume Builder →
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Practice & Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Take mock aptitude and coding tests. (Mocked)</p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
