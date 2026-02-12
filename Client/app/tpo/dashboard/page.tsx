"use client"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store"
import { setRules } from "@/store/slices/tpo-rules-slice"
import { toggleApproveJob } from "@/store/slices/jobs-slice"

export default function TpoDashboard() {
  const dispatch = useDispatch()
  const jobs = useSelector((s: RootState) => s.jobs.items)
  const apps = useSelector((s: RootState) => s.applications.items)
  const rules = useSelector((s: RootState) => (s as any).tpoRules.rules)

  return (
    <main className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold">TPO Dashboard</h1>

      {/* Placement Rules */}
      <section className="border rounded-lg p-4">
        <h2 className="text-lg font-medium mb-3">Placement Rules</h2>
        <form
          className="grid grid-cols-1 md:grid-cols-4 gap-3"
          onSubmit={(e) => {
            e.preventDefault()
            const f = new FormData(e.currentTarget as HTMLFormElement)
            dispatch(
              setRules({
                minCgpa: Number(f.get("minCgpa") || 0),
                allowBacklogs: Boolean(f.get("allowBacklogs")),
                maxOffers: Number(f.get("maxOffers") || 0),
              }),
            )
          }}
        >
          <input
            name="minCgpa"
            type="number"
            min={0}
            max={10}
            step="0.1"
            placeholder="Min CGPA"
            className="border rounded px-3 py-2"
            defaultValue={rules?.minCgpa ?? ""}
          />
          <label className="flex items-center gap-2 text-sm">
            <input name="allowBacklogs" type="checkbox" defaultChecked={rules?.allowBacklogs ?? false} /> Allow Backlogs
          </label>
          <input
            name="maxOffers"
            type="number"
            min={0}
            placeholder="Max Offers"
            className="border rounded px-3 py-2"
            defaultValue={rules?.maxOffers ?? ""}
          />
          <button className="px-3 py-2 bg-primary text-primary-foreground rounded">Save</button>
        </form>
      </section>

      {/* Job Approvals */}
      <section className="border rounded-lg p-4">
        <h2 className="text-lg font-medium mb-3">Job Approvals</h2>
        <ul className="space-y-2">
          {jobs.map((j) => (
            <li key={j.id} className="flex items-center justify-between border rounded p-3">
              <div>
                <p className="font-medium">
                  {j.title} • {j.company}
                </p>
                <p className="text-xs text-muted-foreground">
                  {j.location} • {j.type}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded ${j.isApproved ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                >
                  {j.isApproved ? "Approved" : "Pending"}
                </span>
                <button className="px-2 py-1 border rounded text-sm" onClick={() => dispatch(toggleApproveJob(j.id))}>
                  {j.isApproved ? "Revoke" : "Approve"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Applications monitor */}
      <section className="border rounded-lg p-4">
        <h2 className="text-lg font-medium mb-3">Student Applications</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {apps.map((a) => (
            <li key={a.id} className="border rounded p-3">
              <p className="font-medium text-sm">{a.jobTitle}</p>
              <p className="text-xs text-muted-foreground">
                Company: {a.company} • Status: {a.status}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
