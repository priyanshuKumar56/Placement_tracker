"use client"

import type { ApplicationStage } from "@/lib/types"
import { cn } from "@/lib/utils"

const stages: ApplicationStage[] = ["applied", "test", "shortlisted", "interview", "offer", "joined"]

export function ApplicationTimeline({ current }: { current: ApplicationStage }) {
  return (
    <ol className="flex items-center gap-2">
      {stages.map((s, i) => {
        const active = stages.indexOf(current) >= i
        return (
          <li key={s} className="flex items-center">
            <span
              className={cn(
                "rounded-full border px-2 py-1 text-xs capitalize",
                active ? "bg-primary text-primary-foreground border-primary" : "text-muted-foreground",
              )}
            >
              {s}
            </span>
            {i < stages.length - 1 && <span className="mx-2 h-px w-8 bg-muted" />}
          </li>
        )
      })}
    </ol>
  )
}
