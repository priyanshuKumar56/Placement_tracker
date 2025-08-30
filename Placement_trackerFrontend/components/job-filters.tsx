"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Props = {
  onChange: (f: {
    location?: string
    tier?: "tier-1" | "tier-2" | "tier-3" | "internship" | "all"
    type?: "full-time" | "internship" | "all"
    minSalary?: number
  }) => void
}

export function JobFilters({ onChange }: Props) {
  const [location, setLocation] = useState<string>("all")
  const [tier, setTier] = useState<"tier-1" | "tier-2" | "tier-3" | "internship" | "all">("all")
  const [type, setType] = useState<"full-time" | "internship" | "all">("all")
  const [minSalary, setMinSalary] = useState<number>(0)

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
      <Select
        value={location}
        onValueChange={(v) => {
          setLocation(v)
          onChange({ location: v })
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          <SelectItem value="Bengaluru">Bengaluru</SelectItem>
          <SelectItem value="Hyderabad">Hyderabad</SelectItem>
          <SelectItem value="Pune">Pune</SelectItem>
          <SelectItem value="Remote">Remote</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={tier}
        onValueChange={(v: any) => {
          setTier(v)
          onChange({ tier: v })
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Tier" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Tiers</SelectItem>
          <SelectItem value="tier-1">Tier-1</SelectItem>
          <SelectItem value="tier-2">Tier-2</SelectItem>
          <SelectItem value="tier-3">Tier-3</SelectItem>
          <SelectItem value="internship">Internship</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={type}
        onValueChange={(v: any) => {
          setType(v)
          onChange({ type: v })
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="full-time">Full-time</SelectItem>
          <SelectItem value="internship">Internship</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Min Salary (LPA)</span>
            <Badge variant="secondary">{minSalary}</Badge>
          </div>
          <Slider
            defaultValue={[0]}
            min={0}
            max={20}
            step={1}
            onValueChange={(v) => {
              setMinSalary(v[0])
              onChange({ minSalary: v[0] })
            }}
          />
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setLocation("all")
            setTier("all")
            setType("all")
            setMinSalary(0)
            onChange({ location: "all", tier: "all", type: "all", minSalary: 0 })
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}
