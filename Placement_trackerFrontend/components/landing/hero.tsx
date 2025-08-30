"use client"

import React from "react"
import { useRouter } from "next/navigation"

export function LandingHero() {
  const router = useRouter()
  const [q, setQ] = React.useState("")

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!q.trim()) return
    router.push(`/jobs?q=${encodeURIComponent(q)}`)
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="grid items-center gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h1 className="text-balance text-3xl font-semibold md:text-4xl">
            Discover opportunities, practice, and get placed — all in one place
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Search jobs and internships, track applications, build resumes, and prepare with mock tests.
          </p>

          <form onSubmit={onSubmit} className="w-full max-w-xl">
            <div className="flex items-center gap-2 rounded-lg border bg-background p-2 shadow-sm transition-shadow duration-300 focus-within:shadow-md">
              <input
                className="flex-1 px-3 py-2 text-sm outline-none md:text-base"
                placeholder='Try "SDE Intern", "Data Analyst, Bengaluru"...'
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label="Search opportunities"
              />
              <button
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                aria-label="Search opportunities"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground md:text-sm">
            <span>Popular:</span>
            {["SDE", "Data Analyst", "DevOps", "Internship", "Off-campus"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => router.push(`/jobs?q=${encodeURIComponent(t)}`)}
                className="rounded-full border px-3 py-1 transition-colors hover:bg-accent"
                aria-label={`Search ${t}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border">
          <img
            src="/images/hero.jpg"
            alt="Students collaborating and preparing for placements"
            className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
          />
        </div>
      </div>
    </section>
  )
}
