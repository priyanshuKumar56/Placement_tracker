"use client"

import { Input } from "@/components/ui/input"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"

export function SearchBar({
  value,
  onChange,
  placeholder = "Search opportunities...",
  onSubmit,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  onSubmit?: (q: string) => void
}) {
  return (
    <div className="relative">
      <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9"
        onKeyDown={(e) => {
          if (e.key === "Enter" && onSubmit) {
            e.preventDefault()
            onSubmit(value)
          }
        }}
        aria-label="Search"
      />
    </div>
  )
}
