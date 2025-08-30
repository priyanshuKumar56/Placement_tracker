"use client"

import React from "react"

type User = {
  role: "student" | "company" | "admin"
  name: string
  email: string
  phone?: string
}

type StudentProfile = {
  college?: string
  degree?: string
  branch?: string
  graduationYear?: string
  cgpa?: string
  backlogs?: number
  experienceLevel?: string
  yearsOfExperience?: number
  skills?: string[]
  jobInterests?: string[]
}

function useLocal<T>(key: string, initial: T) {
  const [val, setVal] = React.useState<T>(initial)
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw) setVal(JSON.parse(raw))
    } catch {}
  }, [key])
  React.useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(val))
    } catch {}
  }, [key, val])
  return [val, setVal] as const
}

export default function ProfilePage() {
  const [user] = useLocal<User | null>("pptracker_user", null)
  const [profile, setProfile] = useLocal<StudentProfile>("pptracker_profile", {})
  const [tab, setTab] = React.useState<"overview" | "resume" | "skills" | "applications">("overview")

  if (!user) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-2xl font-semibold">No profile found</h1>
        <p className="text-gray-600 mt-1">Please register or log in to view your profile.</p>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid md:grid-cols-4 gap-6">
        <aside className="md:col-span-1">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="text-lg font-semibold">{user.name}</div>
            <div className="text-sm text-gray-600">{user.email}</div>
            <div className="mt-4 grid gap-2">
              {(["overview", "resume", "skills", "applications"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={
                    tab === t
                      ? "w-full rounded-md bg-blue-600 px-3 py-2 text-left text-sm font-medium text-white"
                      : "w-full rounded-md border border-gray-200 px-3 py-2 text-left text-sm"
                  }
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="md:col-span-3">
          {tab === "overview" && (
            <div className="grid gap-4">
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <h2 className="font-medium">Academic information</h2>
                <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm">
                  <Field label="College" value={profile.college} />
                  <Field label="Degree" value={profile.degree} />
                  <Field label="Branch" value={profile.branch} />
                  <Field label="Graduation Year" value={profile.graduationYear} />
                  <Field label="CGPA" value={profile.cgpa} />
                  <Field label="Backlogs" value={String(profile.backlogs ?? "")} />
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <h2 className="font-medium">Preferences</h2>
                <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm">
                  <Field label="Experience level" value={profile.experienceLevel} />
                  <Field
                    label="Years of experience"
                    value={profile.experienceLevel === "experienced" ? String(profile.yearsOfExperience ?? "") : "—"}
                  />
                  <Field label="Skills" value={profile.skills?.join(", ")} />
                  <Field label="Interests" value={profile.jobInterests?.join(", ")} />
                </div>
              </div>
            </div>
          )}

          {tab === "resume" && <ResumeEditor />}

          {tab === "skills" && (
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h2 className="font-medium">Update skills</h2>
              <SkillsEditor value={profile.skills || []} onChange={(skills) => setProfile({ ...profile, skills })} />
            </div>
          )}

          {tab === "applications" && (
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h2 className="font-medium">Your applications</h2>
              <p className="text-sm text-gray-600 mt-2">
                This is a mock list. Integrate with your Applications state to show real data.
              </p>
              <ul className="mt-4 grid gap-3 text-sm">
                <li className="rounded-md border border-gray-200 p-3">SDE Intern at Acme • Status: Applied</li>
                <li className="rounded-md border border-gray-200 p-3">Frontend Engineer at Globex • Status: Test</li>
              </ul>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="text-gray-800">{value || "—"}</p>
    </div>
  )
}

function ResumeEditor() {
  const [summary, setSummary] = React.useState("")
  const [projects, setProjects] = React.useState([{ name: "", details: "" }])
  const onAdd = () => setProjects((p) => [...p, { name: "", details: "" }])
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <h2 className="font-medium">Resume builder (basic)</h2>
      <div className="mt-4 grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Career objective</label>
          <textarea
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            rows={3}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Driven software engineering student..."
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Projects</label>
            <button type="button" onClick={onAdd} className="text-sm text-blue-600 font-medium">
              Add project
            </button>
          </div>
          <div className="mt-3 grid gap-3">
            {projects.map((p, i) => (
              <div key={i} className="grid gap-2 rounded-md border border-gray-200 p-3">
                <input
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  placeholder="Project name"
                  value={p.name}
                  onChange={(e) => {
                    const next = [...projects]
                    next[i].name = e.target.value
                    setProjects(next)
                  }}
                />
                <textarea
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  rows={2}
                  placeholder="What did you build? What tech did you use?"
                  value={p.details}
                  onChange={(e) => {
                    const next = [...projects]
                    next[i].details = e.target.value
                    setProjects(next)
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white">Save resume</button>
        </div>
      </div>
    </div>
  )
}

function SkillsEditor({
  value,
  onChange,
}: {
  value: string[]
  onChange: (v: string[]) => void
}) {
  const BANK = ["C++", "Java", "JS", "TS", "React", "Node", "SQL", "Python", "DSA", "ML"]
  const toggle = (skill: string) => {
    const set = new Set(value)
    if (set.has(skill)) set.delete(skill)
    else set.add(skill)
    onChange(Array.from(set))
  }
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {BANK.map((s) => {
        const active = value.includes(s)
        return (
          <button
            key={s}
            onClick={() => toggle(s)}
            className={
              active
                ? "rounded-full bg-blue-600 px-3 py-1 text-sm text-white"
                : "rounded-full border border-gray-300 px-3 py-1 text-sm"
            }
          >
            {s}
          </button>
        )
      })}
    </div>
  )
}
