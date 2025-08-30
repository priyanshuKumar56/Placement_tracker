"use client"

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex items-center gap-3 text-sm" aria-label="Registration progress">
      {steps.map((label, idx) => {
        const n = idx + 1
        const isActive = n === current
        const isDone = n < current
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              aria-current={isActive ? "step" : undefined}
              aria-label={`Step ${n}`}
              className={[
                "inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs",
                isDone ? "bg-primary text-primary-foreground border-primary" : "",
                isActive ? "bg-accent text-foreground border-accent-foreground/20" : "",
              ].join(" ")}
            >
              {n}
            </span>
            <span className={isActive ? "font-medium" : "text-muted-foreground"}>{label}</span>
            {n !== steps.length && (
              <span className="mx-1 text-muted-foreground" aria-hidden>
                →
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}
