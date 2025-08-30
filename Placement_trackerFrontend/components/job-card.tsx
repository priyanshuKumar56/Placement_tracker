"use client"

import type { Job, Tier } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { apply as applyAction } from "@/lib/slices/application-slice"
import { notify } from "@/lib/slices/notification-slice"
import { useRouter } from "next/navigation"

function tierLabel(t: Tier) {
  if (t === "tier-1") return "Tier-1 (₹15L+)"
  if (t === "tier-2") return "Tier-2 (₹8-14.99L)"
  if (t === "tier-3") return "Tier-3 (₹3-7.99L)"
  return "Internship"
}

export function JobCard({ job }: { job: Job }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const { currentUser } = useSelector((s: RootState) => s.auth)
  const applications = useSelector((s: RootState) => s.applications.items)
  const already = currentUser ? applications.find((a) => a.userId === currentUser.id && a.jobId === job.id) : undefined

  function handleApply() {
    if (!currentUser) {
      router.push("/login")
      return
    }
    if (currentUser.role !== "student") {
      alert("Only students can apply.")
      return
    }
    try {
      dispatch(applyAction({ userId: currentUser.id, jobId: job.id, jobTier: job.tier }))
      dispatch(
        notify({
          userId: currentUser.id,
          title: "Application Submitted",
          message: `You applied to ${job.title} at ${job.company}.`,
        }),
      )
      alert("Application submitted!")
    } catch (e: any) {
      alert(e.message || "Failed to apply.")
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{job.title}</CardTitle>
          <Badge>{tierLabel(job.tier)}</Badge>
        </div>
        <CardDescription>
          {job.company} • {job.location} • {job.type === "internship" ? "Internship" : "Full-time"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">{job.description}</p>
        <div className="flex flex-wrap gap-2">
          {(job.eligibility.skills ?? []).slice(0, 4).map((s) => (
            <Badge key={s} variant="outline">
              {s}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">{job.salaryLPA ? `₹${job.salaryLPA} LPA` : "Stipend varies"}</span>
          <Button size="sm" disabled={!!already || !job.approved} onClick={handleApply}>
            {already ? "Applied" : job.approved ? "Apply" : "Pending Approval"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
