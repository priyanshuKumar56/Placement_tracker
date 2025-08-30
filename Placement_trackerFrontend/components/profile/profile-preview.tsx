"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProfilePreview() {
  const profile = useSelector((s: RootState) => s.profile)
  const user = useSelector((s: RootState) => s.auth.user)
  const latestResume = profile.resumes[0]

  return (
    <Card className="md:sticky md:top-20">
      <CardHeader>
        <CardTitle className="text-lg">Your Profile</CardTitle>
        <div className="text-sm text-muted-foreground">A quick preview based on your details</div>
        {/* User identity */}
        <div className="mt-2 text-sm">
          <div className="font-medium">{user?.name ?? "Your Name"}</div>
          <div className="text-muted-foreground">{user?.email ?? "you@example.com"}</div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div>
          <div className="text-sm font-medium mb-1">Skills</div>
          <div className="flex flex-wrap gap-2">
            {profile.skills.length ? (
              profile.skills.slice(0, 12).map((s) => (
                <Badge key={s.name} variant="secondary">
                  {s.name}
                </Badge>
              ))
            ) : (
              <div className="text-xs text-muted-foreground">No skills added yet</div>
            )}
          </div>
        </div>

        <div>
          <div className="text-sm font-medium mb-1">Education</div>
          {profile.education ? (
            <div className="text-sm">
              {profile.education.degree} • {profile.education.institution}
            </div>
          ) : (
            <div className="text-xs text-muted-foreground">Add your education</div>
          )}
        </div>

        {/* KPIs row 1 */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-md border p-2">
            <div className="text-lg font-semibold">{profile.projects.length}</div>
            <div className="text-xs text-muted-foreground">Projects</div>
          </div>
          <div className="rounded-md border p-2">
            <div className="text-lg font-semibold">{profile.experience.length}</div>
            <div className="text-xs text-muted-foreground">Experience</div>
          </div>
          <div className="rounded-md border p-2">
            <div className="text-lg font-semibold">{profile.resumes.length}</div>
            <div className="text-xs text-muted-foreground">Resumes</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="rounded-md border p-2">
            <div className="text-lg font-semibold">{profile.certificates?.length ?? 0}</div>
            <div className="text-xs text-muted-foreground">Certificates</div>
          </div>
          <div className="rounded-md border p-2">
            <div className="text-lg font-semibold">{profile.achievements?.length ?? 0}</div>
            <div className="text-xs text-muted-foreground">Achievements</div>
          </div>
        </div>

        <div>
          <div className="text-sm font-medium mb-1">Preferences</div>
          <div className="text-xs text-muted-foreground">
            {profile.preference.roles.join(", ") || "Roles not set"} •{" "}
            {profile.preference.locations.join(", ") || "Locations not set"}
          </div>
        </div>

        {profile.certificates?.length ? (
          <div>
            <div className="mb-1 text-sm font-medium">Recent Certificates</div>
            <ul className="list-disc pl-4 text-xs text-muted-foreground">
              {profile.certificates.slice(0, 3).map((c) => (
                <li key={c.id}>
                  <span className="text-foreground">{c.name}</span>
                  {c.issuer ? ` • ${c.issuer}` : ""} {c.date ? ` • ${c.date}` : ""}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {profile.achievements?.length ? (
          <div>
            <div className="mb-1 text-sm font-medium">Recent Achievements</div>
            <ul className="list-disc pl-4 text-xs text-muted-foreground">
              {profile.achievements.slice(0, 3).map((a) => (
                <li key={a.id}>
                  <span className="text-foreground">{a.title}</span>
                  {a.date ? ` • ${a.date}` : ""} {a.description ? ` — ${a.description}` : ""}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Resume quick action */}
        {latestResume ? (
          <Button asChild variant="outline" size="sm">
            <a href={latestResume.dataUrl} download={latestResume.name}>
              Download latest resume
            </a>
          </Button>
        ) : (
          <div className="text-xs text-muted-foreground">Upload a resume to quick-download here</div>
        )}

        <Button asChild variant="outline" size="sm">
          <Link href="/profile/preview">Open full preview</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
