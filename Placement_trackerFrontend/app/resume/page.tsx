import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function ResumePage() {
  const links = [
    { name: "Canva Resume", href: "https://www.canva.com/create/resumes/" },
    { name: "Google Docs Templates", href: "https://docs.google.com/document/u/0/?ftv=1&tgif=d" },
    { name: "FlowCV", href: "https://flowcv.io/" },
  ]
  return (
    <main className="mx-auto grid max-w-3xl gap-4 px-4 py-8">
      <h1 className="text-2xl font-semibold">Resume Builder</h1>
      {links.map((l) => (
        <Card key={l.name}>
          <CardHeader>
            <CardTitle>{l.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href={l.href} target="_blank" className="text-primary underline">
              Open {l.name}
            </Link>
          </CardContent>
        </Card>
      ))}
    </main>
  )
}
