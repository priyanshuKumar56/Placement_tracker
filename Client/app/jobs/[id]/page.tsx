"use client"

import type React from "react"
import { useParams, useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store"
import { applyToJob } from "@/store/slices/applications-slice"
import { setSelected } from "@/store/slices/jobs-slice"
import { addApplicant } from "@/store/slices/recruiter-slice"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const dispatch = useDispatch()
  const { items } = useSelector((s: RootState) => s.jobs)
  const job = items.find((j) => j.id === id)

  useEffect(() => {
    dispatch(setSelected(id ?? null))
  }, [id, dispatch])

  const [whyUs, setWhyUs] = useState("")
  const [cover, setCover] = useState("")

  function fmtSalary(val: number | null | undefined) {
    if (val === null || val === undefined) return "—"
    return String(val)
  }

  if (!job) return <main className="mx-auto max-w-3xl p-6">Job not found.</main>

  function submitApply(e: React.FormEvent) {
    e.preventDefault()
    if (job.isApproved === false) return // prevent apply if not approved
    const appId = `${job.id}-${Date.now()}` // mirror applications-slice id pattern
    dispatch(applyToJob({ job, id: appId, answers: { whyUs, cover } }))
    dispatch(
      addApplicant({
        applicationId: appId,
        jobId: job.id,
        status: "applied",
      } as any),
    )
    router.push("/applications")
  }

  return (
    <main className="mx-auto grid max-w-3xl gap-6 px-4 py-8">
      <Card>
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-xl">{job.title}</CardTitle>
              <div className="text-sm text-muted-foreground">
                {job.company} • {job.location} • <span className="capitalize">{job.type}</span>
              </div>
            </div>
            <Button
              disabled={job.isApproved === false}
              onClick={() => document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              {job.isApproved === false ? "Not Available" : "Apply Now"}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="border-primary text-primary"
            >{`CTC ${fmtSalary(job.salary)} LPA`}</Badge>
            <Badge variant="outline" className="border-muted-foreground/40 text-muted-foreground capitalize">
              {job.type}
            </Badge>
            {job.tags.map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6">{job.description}</p>
          <div className="mt-4 text-xs text-muted-foreground">Posted {new Date(job.postedAt).toLocaleDateString()}</div>
        </CardContent>
      </Card>

      <Card id="apply-form">
        <CardHeader>
          <CardTitle>Apply to this job</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitApply} className="grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-medium">Why do you want to work here?</span>
              <Textarea
                value={whyUs}
                onChange={(e) => setWhyUs(e.target.value)}
                placeholder="Share your motivation and fit..."
                required
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium">Cover letter (optional)</span>
              <Textarea
                value={cover}
                onChange={(e) => setCover(e.target.value)}
                placeholder="Add any additional context"
              />
            </label>
            <Button type="submit" disabled={job.isApproved === false}>
              {job.isApproved === false ? "Posting not approved" : "Submit Application"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
