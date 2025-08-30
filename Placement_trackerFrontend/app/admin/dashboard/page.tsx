"use client"

import Navbar from "@/components/navbar"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { approveJob } from "@/lib/slices/job-slice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const jobs = useSelector((s: RootState) => s.jobs.items)
  const apps = useSelector((s: RootState) => s.applications.items)
  const dispatch = useDispatch()

  const pending = jobs.filter((j) => !j.approved)
  const completed = apps.filter((a) => a.stage === "joined").length

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-4 text-2xl font-semibold">Admin (TPO) Dashboard</h1>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Jobs</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{jobs.length}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{pending.length}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Joined</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{completed}</CardContent>
          </Card>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 text-lg font-medium">Approve Job Postings</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {pending.length === 0 ? (
              <p className="text-sm text-muted-foreground">No pending jobs.</p>
            ) : (
              pending.map((j) => (
                <Card key={j.id}>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {j.title} • {j.company}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {j.location} • {j.type}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => dispatch(approveJob({ id: j.id, approved: true }))}>
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => dispatch(approveJob({ id: j.id, approved: false }))}
                      >
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
