export function ApplicationTimeline({
  status,
}: { status: "applied" | "under_review" | "shortlisted" | "rejected" | "hired" }) {
  const steps = ["applied", "under_review", "shortlisted", "hired"] as const
  return (
    <div className="flex items-center gap-2 text-xs">
      {steps.map((s, i) => {
        const active = steps.indexOf(status as any) >= i && status !== "rejected"
        const rejected = status === "rejected" && s === "under_review"
        return (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${active ? "bg-primary" : rejected ? "bg-destructive" : "bg-muted"}`}
            />
            <span className={`capitalize ${active ? "text-foreground" : "text-muted-foreground"}`}>
              {s.replace("_", " ")}
            </span>
            {i < steps.length - 1 && <span className="text-muted-foreground">›</span>}
          </div>
        )
      })}
    </div>
  )
}
