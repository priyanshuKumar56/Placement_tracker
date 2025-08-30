"use client"

import Navbar from "@/components/navbar"
import { SearchBar } from "@/components/search-bar"
import { JobFilters } from "@/components/job-filters"
import { JobCard } from "@/components/job-card"
import { useMemo, useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState<any>({})
  const jobs = useSelector((s: RootState) => s.jobs.items)

  const list = useMemo(() => {
    return jobs
      .filter((j) => j.approved)
      .filter(
        (j) =>
          !query ||
          (j.title + " " + j.company + " " + j.location + " " + j.domain).toLowerCase().includes(query.toLowerCase()),
      )
      .filter((j) => !filters.location || filters.location === "all" || j.location === filters.location)
      .filter((j) => !filters.tier || filters.tier === "all" || j.tier === filters.tier)
      .filter((j) => !filters.type || filters.type === "all" || j.type === filters.type)
      .filter((j) => !filters.minSalary || (j.salaryLPA ?? 0) >= (filters.minSalary ?? 0))
      .slice(0, 6)
  }, [jobs, query, filters])

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Hero section with illustration and stats */}
        <section className="grid gap-6 md:grid-cols-2 md:items-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-semibold text-balance">
              Discover internships and jobs. Track your placement journey end-to-end.
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              Built for final-year students and freshers. Apply to curated opportunities, build resumes, practice tests,
              and visualize your path from Applied to Joined — all in one place.
            </p>

          </div>
          <div className="hidden md:block">
            <img
              src="/67c821501ca0d_jobs_header_img.webp"
              alt="Students preparing for placements"
              className="mx-auto rounded-lg border shadow-sm transition-transform duration-700 ease-out hover:scale-[1.02]"
            />
          </div>
        </section>

        {/* Stats section */}
        <section className="mt-12">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { k: "Opportunities", v: "1,200+" },
              { k: "Companies", v: "300+" },
              { k: "Students placed", v: "5,000+" },
              { k: "Avg. package", v: "₹9.2 LPA" },
            ].map((s) => (
              <div key={s.k} className="rounded-md border p-4 text-center">
                <div className="text-2xl font-semibold">{s.v}</div>
                <div className="text-sm text-muted-foreground">{s.k}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured snapshot (not replacing Jobs page) */}
        <section className="mt-8">
          <div className="grid gap-4">
            <SearchBar
              value={query}
              onChange={setQuery}
              onSubmit={(q) => router.push(`/jobs?q=${encodeURIComponent(q)}`)}
              placeholder="Try “SDE Intern”, “Data Analyst, Bangalore”, or “Tier-1 remote”"
            />
            <JobFilters onChange={(f) => setFilters((p: any) => ({ ...p, ...f }))} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((j) => (
              <JobCard key={j.id} job={j} />
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/jobs" className="text-primary hover:underline">
              View all opportunities →
            </Link>
          </div>
        </section>

        {/* Categories */}
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-semibold">Explore categories</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/jobs?q=software" className="rounded-md border p-4 hover:bg-accent">
              <div className="font-medium">Software & IT</div>
              <div className="text-sm text-muted-foreground">SDE, QA, DevOps, Data</div>
            </Link>
            <Link href="/jobs?q=analytics" className="rounded-md border p-4 hover:bg-accent">
              <div className="font-medium">Analytics</div>
              <div className="text-sm text-muted-foreground">Data Analyst, BI, ML</div>
            </Link>
            <Link href="/jobs?q=core" className="rounded-md border p-4 hover:bg-accent">
              <div className="font-medium">Core Engineering</div>
              <div className="text-sm text-muted-foreground">Mechanical, EEE, Civil</div>
            </Link>
            <Link href="/jobs?q=business" className="rounded-md border p-4 hover:bg-accent">
              <div className="font-medium">Business</div>
              <div className="text-sm text-muted-foreground">Product, Ops, Marketing</div>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Resume Builder</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Create multiple resume versions and export as PDF. Auto-fill from your profile.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Application Tracking</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Visual timeline from Applied to Joined with notifications on every update.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Practice Tests</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Mock aptitude and coding tests, analytics and leaderboards. (Mocked)
            </CardContent>
          </Card>
        </section>

        {/* How It Works section */}
        <section className="mt-12">
          <h2 className="mb-6 text-center text-2xl font-semibold">How it works</h2>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { title: "Create profile", desc: "Register and complete your student/company details." },
              { title: "Discover", desc: "Search and filter curated internships and jobs." },
              { title: "Apply & track", desc: "Choose a resume, apply, and track your progress." },
              { title: "Get placed", desc: "Receive offers and finalize your placement." },
            ].map((s, i) => (
              <div
                key={s.title}
                className="rounded-lg border p-5 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-sm"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="text-lg font-medium">{s.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials section */}
        <section className="mt-12 grid items-center gap-6 md:grid-cols-2">
          <div className="order-2 overflow-hidden rounded-xl md:order-1">
            <img
              src="/images/collab.jpg"
              alt="Collaboration"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl font-semibold">What students say</h2>
            <div className="mt-4 space-y-4">
              <blockquote className="rounded-lg border p-4 text-sm text-muted-foreground">
                “The tracker made applications easy. I could see every stage from Applied to Offer.”
                <div className="mt-2 text-xs text-foreground">— Aditi, CSE ‘25</div>
              </blockquote>
              <blockquote className="rounded-lg border p-4 text-sm text-muted-foreground">
                “Resume versions + company-specific tests helped me secure a Tier-1 offer.”
                <div className="mt-2 text-xs text-foreground">— Farhan, ECE ‘24</div>
              </blockquote>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-md border p-6 text-center">
          <h3 className="text-xl font-semibold">Ready to get started?</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Create your account to unlock resume builder and tracking.
          </p>
          <div className="mt-4">
            <Link href="/register" className="text-primary hover:underline">
              Register now →
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
