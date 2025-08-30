"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/store"

export default function ProfilePreviewPage() {
  const user = useSelector((s: RootState) => s.auth.user)
  const p = useSelector((s: RootState) => s.profile)

  return (
    <main className="max-w-3xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-semibold mb-4">Profile Preview</h1>

      <section className="border rounded-lg p-4 space-y-2">
        <h2 className="text-lg font-medium">{user?.name ?? "Your Name"}</h2>
        <p className="text-sm text-muted-foreground">{user?.email ?? "you@example.com"}</p>

        {p.education && (
          <div className="mt-2">
            <h3 className="font-medium">Education</h3>
            <p className="text-sm">
              {p.education.degree} • {p.education.institution} {p.education.cgpa ? `• CGPA ${p.education.cgpa}` : ""}
            </p>
          </div>
        )}

        {p.skills.length > 0 && (
          <div>
            <h3 className="font-medium mt-3">Skills</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {p.skills.map((s) => (
                <span key={s.name} className="text-xs px-2 py-1 bg-muted rounded">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {p.projects.length > 0 && (
          <div>
            <h3 className="font-medium mt-3">Projects</h3>
            <ul className="list-disc pl-5">
              {p.projects.map((pr) => (
                <li key={pr.id}>
                  <span className="font-medium">{pr.title}</span>
                  {pr.url ? ` • ${pr.url}` : ""} {pr.description ? ` — ${pr.description}` : ""}
                </li>
              ))}
            </ul>
          </div>
        )}

        {p.experience.length > 0 && (
          <div>
            <h3 className="font-medium mt-3">Experience</h3>
            <ul className="list-disc pl-5">
              {p.experience.map((ex) => (
                <li key={ex.id}>
                  <span className="font-medium">{ex.role}</span> at {ex.company} {ex.details ? ` — ${ex.details}` : ""}
                </li>
              ))}
            </ul>
          </div>
        )}

        {p.certificates.length > 0 && (
          <div>
            <h3 className="font-medium mt-3">Certificates</h3>
            <ul className="list-disc pl-5">
              {p.certificates.map((c) => (
                <li key={c.id}>
                  <span className="font-medium">{c.name}</span>
                  {c.issuer ? ` • ${c.issuer}` : ""}
                  {c.date ? ` • ${c.date}` : ""}
                  {c.url ? ` • ${c.url}` : ""}
                </li>
              ))}
            </ul>
          </div>
        )}

        {p.achievements.length > 0 && (
          <div>
            <h3 className="font-medium mt-3">Achievements</h3>
            <ul className="list-disc pl-5">
              {p.achievements.map((a) => (
                <li key={a.id}>
                  <span className="font-medium">{a.title}</span>
                  {a.date ? ` • ${a.date}` : ""} {a.description ? ` — ${a.description}` : ""}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  )
}
