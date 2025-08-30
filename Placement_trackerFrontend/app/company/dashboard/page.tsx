"use client"

import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store"
import {
  postJob,
  approveJobLocal,
  scheduleInterview,
  addOffer,
  setApplicantStatus,
} from "@/store/slices/recruiter-slice"
import { addJob, toggleApproveJob } from "@/store/slices/jobs-slice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useState } from "react"

export default function CompanyDashboard() {
  const dispatch = useDispatch()
  const auth = useSelector((s: RootState) => s.companyAuth?.user)
  const recruiter = useSelector((s: RootState) => s.recruiter)
  const jobs = recruiter.jobs

  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [type, setType] = useState<"Full-time" | "Internship" | "Part-time" | "Contract" | undefined>()
  const [salaryMin, setSalaryMin] = useState<number | undefined>()
  const [tags, setTags] = useState("")

  const myApplicants = recruiter.applicants.filter((a) => jobs.some((j) => j.id === a.jobId))

  const [jobFilter, setJobFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredApplicants = myApplicants.filter((a) => {
    const okJob = jobFilter === "all" || a.jobId === jobFilter
    const okStatus = statusFilter === "all" || a.status === statusFilter
    return okJob && okStatus
  })

  const totalApplicants = recruiter.applicants.length
  const shortlistedCount = recruiter.applicants.filter((a) => a.status === "shortlisted").length
  const hiredCount = recruiter.applicants.filter((a) => a.status === "hired").length
  const shortlistRate = totalApplicants ? Math.round((shortlistedCount / totalApplicants) * 100) : 0
  const hireRate = totalApplicants ? Math.round((hiredCount / totalApplicants) * 100) : 0

  const [schedJobId, setSchedJobId] = useState<string>("")
  const [schedDate, setSchedDate] = useState<string>("")
  const [schedMode, setSchedMode] = useState<string>("Online")

  if (!auth)
    return (
      <main className="p-6">
        Please{" "}
        <a className="text-primary underline" href="/company/login">
          login
        </a>{" "}
        as a recruiter.
      </main>
    )

  return (
    <main className="mx-auto max-w-6xl p-4 md:p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-semibold">Recruiter Dashboard</h1>
        <span className="text-sm text-muted-foreground">
          {auth.name} • {auth.email}
        </span>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Post a Job</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input placeholder="Job title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
            <Select onValueChange={(v) => setType(v as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Min Salary (LPA)"
              type="number"
              value={salaryMin?.toString() ?? ""}
              onChange={(e) => setSalaryMin(e.target.value ? Number(e.target.value) : undefined)}
            />
            <Input
              className="md:col-span-2"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <div className="md:col-span-2">
              <Button
                onClick={() => {
                  if (!title || !type) return
                  const id = crypto.randomUUID()
                  const tagArr = tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                  // recruiter slice
                  dispatch(
                    postJob({
                      id,
                      companyId: auth.id,
                      title,
                      location,
                      type,
                      salaryMin: salaryMin ?? null,
                      salaryMax: null,
                      tags: tagArr,
                      description: "",
                      approved: false,
                    }),
                  )
                  // student-facing jobs slice (unapproved by default)
                  dispatch(
                    addJob({
                      id,
                      title,
                      company: auth.name,
                      location,
                      type: (type === "Full-time" ? "full-time" : type === "Internship" ? "internship" : "contract") as
                        | "full-time"
                        | "internship"
                        | "contract",
                      tags: tagArr,
                      description: "",
                      postedAt: new Date().toISOString(),
                      salary: salaryMin ?? null,
                      isApproved: false,
                    }),
                  )
                  setTitle("")
                  setLocation("")
                  setType(undefined)
                  setSalaryMin(undefined)
                  setTags("")
                }}
              >
                Create
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-1">
            <p>Jobs posted: {jobs.length}</p>
            <p>Applicants: {totalApplicants}</p>
            <p>
              Shortlisted: {shortlistedCount} ({shortlistRate}%)
            </p>
            <p>
              Hired: {hiredCount} ({hireRate}%)
            </p>
            <p>Interviews: {recruiter.interviews.length}</p>
            <p>Offers: {recruiter.offers.length}</p>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>My Jobs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {jobs.map((j) => (
              <div key={j.id} className="flex items-center justify-between">
                <div className="text-sm">
                  {j.title} • {j.location} • {j.type} • Min {j.salaryMin ?? "—"}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      dispatch(approveJobLocal({ jobId: j.id, approved: !j.approved }))
                      dispatch(toggleApproveJob(j.id))
                    }}
                  >
                    {j.approved ? "Approved" : "Approve"}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              size="sm"
              onClick={() =>
                dispatch(
                  scheduleInterview({
                    id: "",
                    jobId: jobs[0]?.id || "",
                    date: new Date().toISOString(),
                    mode: "Online",
                  }),
                )
              }
              disabled={!jobs.length}
            >
              Quick Schedule Interview
            </Button>
            <Button
              size="sm"
              onClick={() =>
                dispatch(
                  addOffer({
                    id: "",
                    jobId: jobs[0]?.id || "",
                    ctc: 600000,
                    role: "SDE 1",
                    joining: new Date().toISOString(),
                    status: "Offered",
                  }),
                )
              }
              disabled={!jobs.length}
            >
              Generate Offer
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Applicants</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Select onValueChange={(v) => setJobFilter(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Job" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jobs</SelectItem>
                  {jobs.map((j) => (
                    <SelectItem key={j.id} value={j.id}>
                      {j.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={(v) => setStatusFilter(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                </SelectContent>
              </Select>
              <div className="hidden md:block" />
            </div>

            <div className="divide-y rounded-md border">
              {filteredApplicants.length === 0 && (
                <div className="p-3 text-sm text-muted-foreground">No applicants match your filters.</div>
              )}
              {filteredApplicants.map((a) => {
                const job = jobs.find((j) => j.id === a.jobId)
                return (
                  <div key={a.id} className="flex flex-col gap-2 p-3 md:flex-row md:items-center md:justify-between">
                    <div className="text-sm">
                      <div className="font-medium">
                        {job?.title || "Job"} • <span className="capitalize">{a.status.replace("_", " ")}</span>
                      </div>
                      <div className="text-muted-foreground">Application {a.applicationId}</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={a.status === "under_review" ? "default" : "outline"}
                        size="sm"
                        onClick={() => dispatch(setApplicantStatus({ id: a.id, status: "under_review" }))}
                      >
                        Under Review
                      </Button>
                      <Button
                        variant={a.status === "shortlisted" ? "default" : "outline"}
                        size="sm"
                        onClick={() => dispatch(setApplicantStatus({ id: a.id, status: "shortlisted" }))}
                      >
                        Shortlist
                      </Button>
                      <Button
                        variant={a.status === "rejected" ? "default" : "outline"}
                        size="sm"
                        onClick={() => dispatch(setApplicantStatus({ id: a.id, status: "rejected" }))}
                      >
                        Reject
                      </Button>
                      <Button
                        variant={a.status === "hired" ? "default" : "outline"}
                        size="sm"
                        onClick={() => dispatch(setApplicantStatus({ id: a.id, status: "hired" }))}
                      >
                        Hire
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Interviews & Tests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Job</label>
                <Select onValueChange={(v) => setSchedJobId(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Job" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobs.map((j) => (
                      <SelectItem key={j.id} value={j.id}>
                        {j.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Date & Time</label>
                <Input type="datetime-local" value={schedDate} onChange={(e) => setSchedDate(e.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Mode</label>
                <Select onValueChange={(v) => setSchedMode(v)} defaultValue={schedMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Offline">Offline</SelectItem>
                    <SelectItem value="Test">Test</SelectItem>
                    <SelectItem value="GD">GD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  className="w-full"
                  disabled={!schedJobId || !schedDate}
                  onClick={() => {
                    dispatch(
                      scheduleInterview({
                        id: "",
                        jobId: schedJobId,
                        date: new Date(schedDate).toISOString(),
                        mode: schedMode,
                      }),
                    )
                    setSchedJobId("")
                    setSchedDate("")
                    setSchedMode("Online")
                  }}
                >
                  Schedule
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              {recruiter.interviews.length === 0 ? (
                <div className="p-3 text-sm text-muted-foreground">No interviews/tests scheduled yet.</div>
              ) : (
                <ul className="divide-y">
                  {recruiter.interviews.map((iv) => {
                    const job = jobs.find((j) => j.id === iv.jobId)
                    return (
                      <li key={iv.id || iv.date} className="flex items-center justify-between p-3 text-sm">
                        <div>
                          <div className="font-medium">{job?.title || "Job"}</div>
                          <div className="text-muted-foreground">
                            {new Date(iv.date).toLocaleString()} • {iv.mode}
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Offers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              {recruiter.offers.length === 0 ? (
                <div className="p-3 text-sm text-muted-foreground">No offers generated yet.</div>
              ) : (
                <ul className="divide-y">
                  {recruiter.offers.map((o) => {
                    const job = jobs.find((j) => j.id === o.jobId)
                    return (
                      <li
                        key={o.id || o.jobId}
                        className="flex flex-col md:flex-row md:items-center md:justify-between p-3 text-sm"
                      >
                        <div className="space-y-0.5">
                          <div className="font-medium">
                            {job?.title || "Job"} • {o.role}
                          </div>
                          <div className="text-muted-foreground">
                            CTC {Math.round((o.ctc || 0) / 100000)} LPA • Joining{" "}
                            {new Date(o.joining).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <span className="rounded border px-2 py-0.5 text-xs">{o.status}</span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
