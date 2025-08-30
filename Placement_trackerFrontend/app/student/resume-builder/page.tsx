"use client"

import Navbar from "@/components/navbar"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { addResume, updateResume, removeResume } from "@/lib/slices/resume-slice"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

export default function ResumeBuilderPage() {
  const { currentUser } = useSelector((s: RootState) => s.auth)
  const resumes = useSelector((s: RootState) => s.resumes.items.filter((r) => r.userId === currentUser?.id))
  const dispatch = useDispatch()
  const [title, setTitle] = useState("My Resume")

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-4 text-2xl font-semibold">Resume Builder</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Input placeholder="Resume title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Button
              onClick={() =>
                dispatch(addResume({ userId: currentUser!.id, title, data: { objective: "Aspiring engineer..." } }))
              }
            >
              Add
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {resumes.map((r) => (
            <Card key={r.id}>
              <CardHeader>
                <CardTitle className="text-base">{r.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">Objective: {r.data.objective || "-"}</div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => dispatch(updateResume({ ...r, title: r.title + " (Updated)" }))}
                  >
                    Update
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => dispatch(removeResume({ id: r.id }))}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
