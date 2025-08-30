"use client"

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function PreferencesStep({
  experienceLevel,
  onExperienceLevel,
  yearsOfExperience,
  onYearsOfExperience,
  preferredDomain,
  onPreferredDomain,
  preferredLocation,
  onPreferredLocation,
  onBack,
  onSubmit,
  canSubmit,
}: {
  experienceLevel: "fresher" | "experienced"
  onExperienceLevel: (v: "fresher" | "experienced") => void
  yearsOfExperience: string
  onYearsOfExperience: (v: string) => void
  preferredDomain: string
  onPreferredDomain: (v: string) => void
  preferredLocation: string
  onPreferredLocation: (v: string) => void
  onBack: () => void
  onSubmit: () => void
  canSubmit: boolean
}) {
  const years = yearsOfExperience.replace(/[^\d]/g, "")

  return (
    <div className="grid gap-3">
      <div>
        <label className="mb-1 block text-sm font-medium">Experience</label>
        <Select value={experienceLevel} onValueChange={(v: any) => onExperienceLevel(v)}>
          <SelectTrigger>
            <SelectValue placeholder="Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fresher">Fresher</SelectItem>
            <SelectItem value="experienced">Experienced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {experienceLevel === "experienced" && (
        <div>
          <label className="mb-1 block text-sm font-medium">Years of Experience</label>
          <Input
            inputMode="numeric"
            placeholder="1"
            value={years}
            onChange={(e) => onYearsOfExperience(e.target.value.replace(/[^\d]/g, ""))}
          />
          {Number.parseInt(years || "0", 10) < 1 && (
            <p className="mt-1 text-xs text-red-600">Enter at least 1 year for experienced.</p>
          )}
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium">Preferred Domain</label>
        <Input
          placeholder="e.g., Software"
          value={preferredDomain}
          onChange={(e) => onPreferredDomain(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Preferred Location</label>
        <Input
          placeholder="e.g., Bengaluru"
          value={preferredLocation}
          onChange={(e) => onPreferredLocation(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSubmit} disabled={!canSubmit}>
          Create Account
        </Button>
      </div>
    </div>
  )
}
