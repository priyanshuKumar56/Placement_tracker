"use client"

import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { addJob } from "@/lib/slices/job-slice"
import type { Job, Tier } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

export default function NewCompanyJobPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((s: RootState) => s.auth.currentUser)

  const [skillInput, setSkillInput] = useState("")
  const [skills, setSkills] = useState<string[]>([])

  function pushSkill() {
    const v = skillInput.trim()
    if (v && !skills.includes(v)) setSkills((prev) => [...prev, v])
    setSkillInput("")
  }
  function removeSkill(v: string) {
    setSkills((prev) => prev.filter((s) => s !== v))
  }

  if (!user || user.role !== "company") {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Post a Job</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Please login as a company member to post jobs.
          </CardContent>
        </Card>
      </main>
    )
  }

  async function onSubmit(formData: FormData) {
    const title = String(formData.get("title") || "").trim()
    const company = String(formData.get("company") || user.companyName || "").trim()
    const location = String(formData.get("location") || "").trim()
    const domain = String(formData.get("domain") || "").trim()
    const description = String(formData.get("description") || "").trim()
    const salaryLPA = Number(formData.get("salaryLPA") || Number.NaN)
    const tier = String(formData.get("tier") || "tier-2") as Tier
    const type = String(formData.get("type") || "full-time") as Job["type"]
    const minCgpa = Number(formData.get("minCgpa") || Number.NaN)
    const maxBacklogs = Number(formData.get("maxBacklogs") || Number.NaN)
    const departments = String(formData.get("departments") || "")
      .split(",")
      .map((d) => d.trim())
      .filter(Boolean)
    const deadline = String(formData.get("deadline") || "").trim()

    if (!title || !company || !location || !domain || !description) {
      alert("Please fill Title, Company, Location, Domain and Description.")
      return
    }

    const payload: Omit<Job, "id" | "approved"> = {
      title,
      company,
      location,
      domain,
      description,
      salaryLPA: Number.isFinite(salaryLPA) ? salaryLPA : undefined,
      tier,
      type,
      eligibility: {
        minCgpa: Number.isFinite(minCgpa) ? minCgpa : undefined,
        maxBacklogs: Number.isFinite(maxBacklogs) ? maxBacklogs : undefined,
        departments: departments.length ? departments : undefined,
        skills: skills.length ? skills : undefined,
      },
      postedBy: user.id,
      deadline: deadline || undefined,
    }

    dispatch(addJob(payload))
    router.push("/company/dashboard")
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <form action={onSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="col-span-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="e.g., Frontend Engineer" />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" defaultValue={user.companyName || ""} />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" placeholder="e.g., Bengaluru" />
            </div>
            <div>
              <Label htmlFor="domain">Domain</Label>
              <Input id="domain" name="domain" placeholder="e.g., Software, Analytics, Core" />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select name="type" defaultValue="full-time">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tier">Tier</Label>
              <Select name="tier" defaultValue="tier-2">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tier-1">tier-1</SelectItem>
                  <SelectItem value="tier-2">tier-2</SelectItem>
                  <SelectItem value="tier-3">tier-3</SelectItem>
                  <SelectItem value="internship">internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="salaryLPA">Package (LPA)</Label>
              <Input id="salaryLPA" name="salaryLPA" type="number" step="0.1" placeholder="e.g., 12" />
            </div>
            <div>
              <Label htmlFor="deadline">Deadline</Label>
              <Input id="deadline" name="deadline" type="date" />
            </div>
            <div className="col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={5} placeholder="Role overview, responsibilities..." />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Eligibility & Skills</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="minCgpa">Min CGPA</Label>
              <Input id="minCgpa" name="minCgpa" type="number" step="0.1" placeholder="e.g., 7.0" />
            </div>
            <div>
              <Label htmlFor="maxBacklogs">Max Backlogs</Label>
              <Input id="maxBacklogs" name="maxBacklogs" type="number" placeholder="e.g., 0" />
            </div>
            <div className="md:col-span-2">
              <Label>Skills</Label>
              <div className="mt-2 flex gap-2">
                <Input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="Add a skill" />
                <Button type="button" variant="secondary" onClick={pushSkill}>
                  Add
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <Badge key={s} variant="secondary" className="cursor-pointer" onClick={() => removeSkill(s)}>
                    {s} ×
                  </Badge>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="departments">Eligible Departments (comma separated)</Label>
              <Input id="departments" name="departments" placeholder="CSE, ECE, ME, CE" />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.push("/company/dashboard")}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Publish Job
          </Button>
        </div>
      </form>
    </main>
  )
}
