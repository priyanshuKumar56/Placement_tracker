"use client"

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function EducationStep({
  degree,
  onDegree,
  branches,
  branch,
  onBranch,
  college,
  onCollege,
  cgpa,
  onCgpa,
  backlogs,
  onBacklogs,
  gradYear,
  onGradYear,
  onNext,
  onBack,
  canContinue,
}: {
  degree: string
  onDegree: (v: string) => void
  branches: string[]
  branch: string
  onBranch: (v: string) => void
  college: string
  onCollege: (v: string) => void
  cgpa: string
  onCgpa: (v: string) => void
  backlogs: string
  onBacklogs: (v: string) => void
  gradYear: string
  onGradYear: (v: string) => void
  onNext: () => void
  onBack: () => void
  canContinue: boolean
}) {
  const cg = Number.isNaN(Number(cgpa)) ? "" : cgpa
  const bl = backlogs.replace(/[^\d]/g, "")
  const gy = gradYear.replace(/[^\d]/g, "").slice(0, 4)

  return (
    <div className="grid gap-3">
      <div>
        <label className="mb-1 block text-sm font-medium">Degree</label>
        <Select value={degree} onValueChange={onDegree}>
          <SelectTrigger>
            <SelectValue placeholder="Degree" />
          </SelectTrigger>
          <SelectContent>
            {["B.Tech", "B.Sc", "M.Tech"].map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Branch</label>
        <Select value={branch} onValueChange={onBranch}>
          <SelectTrigger>
            <SelectValue placeholder="Branch" />
          </SelectTrigger>
          <SelectContent>
            {(branches.length ? branches : ["Computer Science"]).map((b) => (
              <SelectItem key={b} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">College</label>
        <Input placeholder="Institute / University" value={college} onChange={(e) => onCollege(e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-sm font-medium">CGPA (0 - 10)</label>
          <Input
            inputMode="decimal"
            placeholder="e.g., 8.2"
            value={cg}
            onChange={(e) => {
              const v = e.target.value.replace(/[^0-9.]/g, "")
              onCgpa(v)
            }}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Backlogs</label>
          <Input
            inputMode="numeric"
            placeholder="0"
            value={bl}
            onChange={(e) => onBacklogs(e.target.value.replace(/[^\d]/g, ""))}
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Graduation Year</label>
        <Input
          inputMode="numeric"
          placeholder="2025"
          value={gy}
          onChange={(e) => onGradYear(e.target.value.replace(/[^\d]/g, "").slice(0, 4))}
        />
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!canContinue}>
          Continue
        </Button>
      </div>
    </div>
  )
}
