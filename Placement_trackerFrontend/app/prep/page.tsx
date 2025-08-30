import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function PrepPage() {
  const sections = [
    {
      title: "Aptitude",
      links: [{ name: "InterviewBit Aptitude", href: "https://www.interviewbit.com/aptitude-questions/" }],
    },
    {
      title: "DSA",
      links: [
        { name: "LeetCode", href: "https://leetcode.com/" },
        { name: "GeeksForGeeks", href: "https://www.geeksforgeeks.org/" },
      ],
    },
    {
      title: "System Design",
      links: [{ name: "System Design Primer", href: "https://github.com/donnemartin/system-design-primer" }],
    },
  ]
  return (
    <main className="mx-auto grid max-w-4xl gap-4 px-4 py-8">
      <h1 className="text-2xl font-semibold">Test Preparation</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((sec) => (
          <Card key={sec.title}>
            <CardHeader>
              <CardTitle>{sec.title}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              {sec.links.map((l) => (
                <Link key={l.name} className="text-primary underline" href={l.href} target="_blank">
                  {l.name}
                </Link>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
