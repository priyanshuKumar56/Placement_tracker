"use client"

import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store"
import { setFilters } from "@/store/slices/jobs-slice"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const types = ["full-time", "internship", "contract"] as const

export default function JobsPage() {
  const dispatch = useDispatch()
  const { items, filters } = useSelector((s: RootState) => s.jobs)

  // derive unique locations and popular tags
  const locations = useMemo(() => Array.from(new Set(items.map((j) => j.location))), [items])
  const popularTags = useMemo(() => {
    const map = new Map<string, number>()
    for (const j of items) for (const t of j.tags) map.set(t, (map.get(t) || 0) + 1)
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([t]) => t)
      .slice(0, 8)
  }, [items])

  // filtering
  const visible = useMemo(() => {
    const q = filters.query.trim().toLowerCase()
    return items.filter((job) => {
      const passApproved = job.isApproved !== false // hide unapproved
      const passQ =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.tags.join(" ").toLowerCase().includes(q)
      const passType = !filters.types.length || filters.types.includes(job.type)
      const passLoc = !filters.locations.length || filters.locations.includes(job.location)
      const passTags = !filters.tags.length || filters.tags.every((t) => job.tags.includes(t))
      const salaryVal = job.salary ?? null
      const min = filters.minSalary ?? null
      const max = filters.maxSalary ?? null
      const passMin = min === null || (salaryVal !== null && salaryVal >= min)
      const passMax = max === null || (salaryVal !== null && salaryVal <= max)
      return passApproved && passQ && passType && passLoc && passTags && passMin && passMax
    })
  }, [items, filters])

  // pagination
  const [page, setPage] = useState(1)
  const pageSize = 5
  const pageCount = Math.max(1, Math.ceil(visible.length / pageSize))
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize
    return visible.slice(start, start + pageSize)
  }, [visible, page])

  useEffect(() => {
    setPage(1)
  }, [filters.query, filters.types, filters.locations, filters.tags, filters.minSalary, filters.maxSalary])

  function toggleArray<T extends string>(arr: readonly T[] | T[], value: T): T[] {
    const set = new Set(arr as T[])
    set.has(value) ? set.delete(value) : set.add(value)
    return Array.from(set)
  }

  function fmtSalary(val: number | null | undefined) {
    if (val === null || val === undefined) return "—"
    // keep integers for LPA; if needed, toFixed(1) could be used
    return String(val)
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-[280px_1fr]">
      <aside className="rounded-md border p-4">
        <h2 className="mb-3 font-medium">Filters</h2>
        <div className="space-y-4">
          <Input
            placeholder="Search roles, company, skills"
            value={filters.query}
            onChange={(e) => dispatch(setFilters({ query: e.target.value }))}
          />

          <div>
            <div className="mb-2 text-sm text-muted-foreground">Type</div>
            <div className="grid gap-2">
              {types.map((t) => (
                <label key={t} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={filters.types.includes(t)}
                    onCheckedChange={(v) => {
                      dispatch(setFilters({ types: toggleArray(filters.types, t) as any }))
                    }}
                  />
                  <span className="capitalize">{t.replace("-", " ")}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm text-muted-foreground">Location</div>
            <div className="grid gap-2">
              {locations.map((loc) => (
                <label key={loc} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={filters.locations.includes(loc)}
                    onCheckedChange={() => {
                      dispatch(setFilters({ locations: toggleArray(filters.locations, loc) }))
                    }}
                  />
                  <span>{loc}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm text-muted-foreground">Salary (LPA)</div>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                min={0}
                placeholder="Min"
                value={filters.minSalary ?? ""}
                onChange={(e) => {
                  const val = e.target.value === "" ? null : Number(e.target.value)
                  dispatch(setFilters({ minSalary: val }))
                }}
              />
              <Input
                type="number"
                min={0}
                placeholder="Max"
                value={filters.maxSalary ?? ""}
                onChange={(e) => {
                  const val = e.target.value === "" ? null : Number(e.target.value)
                  dispatch(setFilters({ maxSalary: val }))
                }}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm text-muted-foreground">Tags</div>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((t) => {
                const active = filters.tags.includes(t)
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => dispatch(setFilters({ tags: toggleArray(filters.tags, t) }))}
                    className={cn(
                      "inline-flex items-center rounded-md border px-2 py-1 text-xs",
                      active ? "border-primary text-primary" : "border-muted-foreground/30 text-muted-foreground",
                    )}
                  >
                    {t}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() =>
                dispatch(
                  setFilters({ query: "", types: [], locations: [], tags: [], minSalary: null, maxSalary: null }),
                )
              }
            >
              Reset
            </Button>
          </div>
        </div>
      </aside>

      <section className="grid gap-4">
        {paged.map((job) => (
          <Card key={job.id} className="transition-colors hover:border-primary/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">{job.title}</CardTitle>
                <div className="text-sm text-muted-foreground">
                  {job.company} • {job.location} • <span className="capitalize">{job.type}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="border-primary text-primary">
                  {`CTC ${fmtSalary(job.salary)} LPA`}
                </Badge>
                {job.tags.map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-4">
              <p className="line-clamp-2 text-sm text-muted-foreground">{job.description}</p>
              <Button asChild>
                <Link href={`/jobs/${job.id}`}>View</Link>
              </Button>
            </CardContent>
          </Card>
        ))}

        {!paged.length && (
          <div className="text-sm text-muted-foreground">No jobs match your filters. Try widening your search.</div>
        )}

        {visible.length > 0 && (
          <div className="mt-2 flex items-center justify-between rounded-md border p-2 text-sm">
            <div>
              Page {page} of {pageCount} • Showing {(page - 1) * pageSize + 1}-
              {Math.min(page * pageSize, visible.length)} of {visible.length}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled={page >= pageCount} onClick={() => setPage((p) => p + 1)}>
                Next
              </Button>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
