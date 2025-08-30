"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const statusColor: Record<string, string> = {
  applied: "bg-blue-100 text-blue-700",
  under_review: "bg-amber-100 text-amber-700",
  shortlisted: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
  hired: "bg-emerald-200 text-emerald-900",
}

const steps = ["applied", "under_review", "shortlisted", "hired"] as const

export default function ApplicationsPage() {
  const apps = useSelector((s: RootState) => s.applications.items)

  return (
    <main className="mx-auto grid max-w-3xl gap-4 px-4 py-8">
      <h1 className="text-2xl font-semibold">Your Applications</h1>
      {apps.map((a) => (
        <Card key={a.id}>
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">{a.jobTitle}</CardTitle>
              <div className="text-sm text-muted-foreground">
                {a.company} • Applied {new Date(a.submittedAt).toLocaleDateString()}
              </div>
            </div>
            <Badge className={statusColor[a.status] || ""}>{a.status.replace("_", " ")}</Badge>
          </CardHeader>
          <CardContent>
            <ol className="mb-3 flex items-center gap-2" aria-label="Application status tracker">
              {steps.map((s, idx) => {
                const effective = (a.status as any) === "rejected" ? "under_review" : (a.status as any)
                const activeIdx = steps.indexOf(effective)
                const isDone = idx <= activeIdx
                return (
                  <li key={s} className="flex items-center gap-2 text-xs">
                    <span
                      className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${isDone ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground"}`}
                      aria-label={s}
                    >
                      {idx + 1}
                    </span>
                    <span className={`capitalize ${isDone ? "text-foreground" : "text-muted-foreground"}`}>
                      {s.replace("_", " ")}
                    </span>
                    {idx < steps.length - 1 && <span className="mx-1 h-px w-6 bg-border" aria-hidden="true" />}
                  </li>
                )
              })}
            </ol>

            <div className="grid gap-2 text-sm">
              {a.answers?.whyUs && (
                <div>
                  <span className="font-medium">Why Us: </span>
                  {a.answers.whyUs}
                </div>
              )}
              {a.answers?.cover && (
                <div>
                  <span className="font-medium">Cover: </span>
                  {a.answers.cover}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      {!apps.length && (
        <div className="text-sm text-muted-foreground">No applications yet. Apply to a job to see it here.</div>
      )}
    </main>
  )
}
