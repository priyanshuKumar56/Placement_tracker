"use client"

import Navbar from "@/components/navbar"
import { SearchBar } from "@/components/search-bar"
import { JobFilters } from "@/components/job-filters"
import { JobCard } from "@/components/job-card"
import { useMemo, useState, useEffect } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { useSearchParams, useRouter } from "next/navigation"

export default function JobsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQ = searchParams.get("q") || ""
  const [query, setQuery] = useState(initialQ)
  const [filters, setFilters] = useState<any>({})
  const jobs = useSelector((s: RootState) => s.jobs.items)

  useEffect(() => {
    const q = searchParams.get("q") || ""
    setQuery(q)
  }, [searchParams])

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
  }, [jobs, query, filters])

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 grid gap-4">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search roles, companies, locations..."
            onSubmit={(q) => router.push(`/jobs?q=${encodeURIComponent(q)}`)}
          />
          <JobFilters onChange={(f) => setFilters((p: any) => ({ ...p, ...f }))} />
        </div>
        {list.length === 0 ? (
          <p className="text-sm text-muted-foreground">No jobs match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((j) => (
              <JobCard key={j.id} job={j} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
