"use client"

import type React from "react"

import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store"
import {
  addSkill,
  removeSkill,
  setEducation,
  setPreference,
  upsertProject,
  removeProject,
  upsertExperience,
  removeExperience,
  addResume,
  removeResume,
  addCertificate,
  removeCertificate,
  addAchievement,
  removeAchievement,
} from "@/store/slices/profile-slice"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import ProfilePreview from "@/components/profile/profile-preview"
import Link from "next/link"

export default function ProfilePage() {
  const dispatch = useDispatch()
  const profile = useSelector((s: RootState) => s.profile)

  const [skill, setSkill] = useState("")
  const [projectTitle, setProjectTitle] = useState("")
  const [projectDesc, setProjectDesc] = useState("")
  const [projectSkills, setProjectSkills] = useState("")
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [expDetails, setExpDetails] = useState("")

  const [certName, setCertName] = useState("")
  const [certIssuer, setCertIssuer] = useState("")
  const [certDate, setCertDate] = useState("")
  const [certUrl, setCertUrl] = useState("")

  const [achTitle, setAchTitle] = useState("")
  const [achDate, setAchDate] = useState("")
  const [achDesc, setAchDesc] = useState("")

  async function onResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = String(reader.result)
      dispatch(addResume({ id: crypto.randomUUID(), name: file.name, dataUrl, uploadedAt: new Date().toISOString() }))
    }
    reader.readAsDataURL(file)
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-[1fr_360px]">
      <section className="grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <Button asChild variant="outline">
            <Link href="/profile/preview">Open Preview</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill (e.g., React)"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && skill.trim()) {
                    dispatch(addSkill({ name: skill.trim() }))
                    setSkill("")
                  }
                }}
              />
              <Button
                onClick={() => {
                  if (skill.trim()) {
                    dispatch(addSkill({ name: skill.trim() }))
                    setSkill("")
                  }
                }}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((s) => (
                <Badge key={s.name} className="cursor-pointer" onClick={() => dispatch(removeSkill(s.name))}>
                  {s.name} ×
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="grid gap-3 md:grid-cols-2">
              <Input
                placeholder="Project title"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
              />
              <Input
                placeholder="Skills (comma separated)"
                value={projectSkills}
                onChange={(e) => setProjectSkills(e.target.value)}
              />
            </div>
            <Textarea
              placeholder="Short description"
              value={projectDesc}
              onChange={(e) => setProjectDesc(e.target.value)}
            />
            <Button
              onClick={() => {
                if (!projectTitle.trim()) return
                const skills = projectSkills
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
                dispatch(
                  upsertProject({
                    id: crypto.randomUUID(),
                    title: projectTitle.trim(),
                    description: projectDesc.trim() || undefined,
                    skills: skills.length ? skills : undefined,
                  }),
                )
                setProjectTitle("")
                setProjectDesc("")
                setProjectSkills("")
              }}
            >
              Save Project
            </Button>
            <div className="grid gap-2">
              {profile.projects.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <div className="font-medium">{p.title}</div>
                    <div className="text-sm text-muted-foreground">{p.description}</div>
                    {p.skills?.length ? (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {p.skills.map((s) => (
                          <span key={s} className="rounded border px-1.5 py-0.5 text-xs text-muted-foreground">
                            {s}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <Button variant="ghost" onClick={() => dispatch(removeProject(p.id))}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Experience</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="grid gap-3 md:grid-cols-2">
              <Input placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
              <Input placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
            </div>
            <Textarea
              placeholder="What did you do?"
              value={expDetails}
              onChange={(e) => setExpDetails(e.target.value)}
            />
            <Button
              onClick={() => {
                if (!company.trim() || !role.trim()) return
                dispatch(
                  upsertExperience({
                    id: crypto.randomUUID(),
                    company: company.trim(),
                    role: role.trim(),
                    start: new Date().toISOString(),
                    details: expDetails.trim(),
                  }),
                )
                setCompany("")
                setRole("")
                setExpDetails("")
              }}
            >
              Add Experience
            </Button>
            <div className="grid gap-2">
              {profile.experience.map((ex) => (
                <div key={ex.id} className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <div className="font-medium">
                      {ex.role} • {ex.company}
                    </div>
                    <div className="text-sm text-muted-foreground">{ex.details}</div>
                  </div>
                  <Button variant="ghost" onClick={() => dispatch(removeExperience(ex.id))}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Education & Preferences</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Button
              variant="outline"
              onClick={() =>
                dispatch(setEducation({ degree: "B.Tech", institution: "Your University", start: "2021-08-01" }))
              }
            >
              Set sample education
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                dispatch(setPreference({ locations: ["Remote"], roles: ["Frontend Engineer"], types: ["full-time"] }))
              }
            >
              Set sample preferences
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resume</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Input type="file" accept=".pdf" onChange={onResumeUpload} />
            <div className="grid gap-3 md:grid-cols-2">
              {profile.resumes.map((r) => (
                <div key={r.id} className="rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{r.name}</div>
                    <Button variant="ghost" onClick={() => dispatch(removeResume(r.id))}>
                      Remove
                    </Button>
                  </div>
                  <a href={r.dataUrl} download={r.name} className="text-sm text-primary underline">
                    Download
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Certificates</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="grid gap-3 md:grid-cols-2">
              <Input placeholder="Name" value={certName} onChange={(e) => setCertName(e.target.value)} />
              <Input placeholder="Issuer" value={certIssuer} onChange={(e) => setCertIssuer(e.target.value)} />
              <Input type="date" placeholder="Date" value={certDate} onChange={(e) => setCertDate(e.target.value)} />
              <Input placeholder="URL" value={certUrl} onChange={(e) => setCertUrl(e.target.value)} />
            </div>
            <Button
              onClick={() => {
                if (!certName.trim()) return
                dispatch(
                  addCertificate({
                    id: crypto.randomUUID(),
                    name: certName.trim(),
                    issuer: certIssuer.trim() || undefined,
                    date: certDate || undefined,
                    url: certUrl.trim() || undefined,
                  }),
                )
                setCertName("")
                setCertIssuer("")
                setCertDate("")
                setCertUrl("")
              }}
            >
              Add Certificate
            </Button>
            <div className="grid gap-2">
              {profile.certificates.map((c) => (
                <div key={c.id} className="flex items-center justify-between rounded-md border p-3 text-sm">
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-muted-foreground">{[c.issuer, c.date, c.url].filter(Boolean).join(" • ")}</div>
                  </div>
                  <Button variant="ghost" onClick={() => dispatch(removeCertificate(c.id))}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="grid gap-3 md:grid-cols-2">
              <Input placeholder="Title" value={achTitle} onChange={(e) => setAchTitle(e.target.value)} />
              <Input type="date" placeholder="Date" value={achDate} onChange={(e) => setAchDate(e.target.value)} />
            </div>
            <Textarea placeholder="Description" value={achDesc} onChange={(e) => setAchDesc(e.target.value)} />
            <Button
              onClick={() => {
                if (!achTitle.trim()) return
                dispatch(
                  addAchievement({
                    id: crypto.randomUUID(),
                    title: achTitle.trim(),
                    date: achDate || undefined,
                    description: achDesc.trim() || undefined,
                  }),
                )
                setAchTitle("")
                setAchDate("")
                setAchDesc("")
              }}
            >
              Add Achievement
            </Button>
            <div className="grid gap-2">
              {profile.achievements.map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-md border p-3 text-sm">
                  <div>
                    <div className="font-medium">{a.title}</div>
                    <div className="text-muted-foreground">{[a.date, a.description].filter(Boolean).join(" • ")}</div>
                  </div>
                  <Button variant="ghost" onClick={() => dispatch(removeAchievement(a.id))}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <aside className="hidden md:block">
        <ProfilePreview />
      </aside>
    </main>
  )
}
