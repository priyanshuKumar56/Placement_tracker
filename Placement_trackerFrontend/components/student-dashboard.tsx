"use client"

import Nav from "@/components/nav"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ApplicationTimeline } from "@/components/application-timeline"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function StudentDashboard() {
  const { user } = useSelector((s: RootState) => s.auth)
  const profile = useSelector((s: RootState) => s.profile)
  const allApps = useSelector((s: RootState) => s.applications.items)
  const apps = user?.id ? allApps.filter((a) => a.userId === user.id) : allApps.slice(0, 5)
  const allNotifications = useSelector((s: RootState) => s.notifications.items)
  const notifications = user?.id ? allNotifications.filter((n) => n.userId === user.id) : allNotifications.slice(0, 5)
  const jobs = useSelector((s: RootState) => s.jobs.items)
  const prepCategories = useSelector((s: RootState) => s.prep.categories)

  const quickStats = {
    applied: apps.length,
    upcoming: apps.filter((a) => a.stage === "test" || a.stage === "interview").length,
    offers: apps.filter((a) => a.stage === "offer" || a.stage === "joined").length,
  }

  const name = user?.name || "Student"
  const email = user?.email || "guest@example.com"
  const avatarUrl = (user as any)?.avatarUrl as string | undefined
  const completion = Math.max(0, Math.min(100, profile?.completion || 0))

  return (
    <div>
      <Nav />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-4 text-2xl font-semibold text-balance">Student Dashboard</h1>

        <section className="mb-6">
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={`${name} avatar`} />
                    <AvatarFallback>{name.slice(0, 1).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{name}</div>
                    <div className="text-sm text-muted-foreground">{email}</div>
                    <div className="mt-2 w-full max-w-xs">
                      <div aria-label="Profile completion" className="h-2 w-full rounded bg-muted">
                        <div
                          className="h-2 rounded bg-primary"
                          style={{ width: `${completion}%` }}
                          aria-valuenow={completion}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          role="progressbar"
                        />
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">{completion}% complete</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link href="/profile">
                    <Button variant="secondary">Edit Profile</Button>
                  </Link>
                  <Link href="/profile/preview">
                    <Button variant="outline">Recruiter Preview</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Applied</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{quickStats.applied}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Upcoming</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{quickStats.upcoming}</CardContent>
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
                <div className="text-sm text-muted-foreground">Create, import, and export</div>
              </div>
              <Link href="/tools/resume-builder">
                <Button size="sm">Open</Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="transition-colors hover:bg-accent/50">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <div className="font-medium">My Applications</div>
                <div className="text-sm text-muted-foreground">Track status and stages</div>
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
                <div className="font-medium">Internships</div>
                <div className="text-sm text-muted-foreground">Entry pathways</div>
              </div>
              <Link href="/internships">
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
                <div className="text-sm text-muted-foreground">Aptitude, coding, patterns</div>
              </div>
              <Link href="/tests/prep">
                <Button size="sm" variant="secondary">
                  Start
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="transition-colors hover:bg-accent/50">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <div className="font-medium">View Profile</div>
                <div className="text-sm text-muted-foreground">See what recruiters see</div>
              </div>
              <Link href="/profile/preview">
                <Button size="sm" variant="outline">
                  Preview
                </Button>
              </Link>
            </CardContent>
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
                  <Link href="/jobs" className="text-primary hover:underline">
                    Jobs
                  </Link>
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
              <p className="mb-3 text-sm text-muted-foreground">
                Create and manage resume versions, import from PDF, and export.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link href="/tools/resume-builder">
                  <Button>Open Builder</Button>
                </Link>
                <Link href="/profile/preview">
                  <Button variant="outline">Recruiter Preview</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Practice & Tests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {prepCategories.map((cat) => (
                <div key={cat.id}>
                  <div className="mb-1 text-sm font-medium">{cat.name}</div>
                  <div className="space-y-2">
                    {cat.modules.map((m) => (
                      <div key={m.id}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{m.title}</span>
                          <span className="tabular-nums">{m.progress}%</span>
                        </div>
                        <div className="h-2 w-full rounded bg-muted">
                          <div
                            className="h-2 rounded bg-primary"
                            style={{ width: `${Math.max(0, Math.min(100, m.progress))}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <Link href="/tests/prep">
                  <Button size="sm" variant="secondary">
                    Go to Prep Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
