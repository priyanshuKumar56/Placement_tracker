"use client"
import { useRouter } from "next/navigation"

const MOCK_FEATURED = [
  { id: "1", title: "SDE Intern", company: "Acme", pkg: "₹6 LPA", tag: "Internship" },
  { id: "2", title: "Frontend Engineer", company: "Globex", pkg: "₹12 LPA", tag: "Tier-2" },
  { id: "3", title: "Data Analyst", company: "Initech", pkg: "₹10 LPA", tag: "Tier-2" },
  { id: "4", title: "Platform Engineer", company: "Umbrella", pkg: "₹18 LPA", tag: "Tier-1" },
]

export function LandingFeaturedJobs() {
  const router = useRouter()
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured opportunities</h2>
          <button className="text-sm text-blue-600 font-medium" onClick={() => router.push("/jobs")}>
            View all
          </button>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {MOCK_FEATURED.map((j) => (
            <button
              key={j.id}
              onClick={() => router.push(`/jobs?q=${encodeURIComponent(j.title)}`)}
              className="rounded-lg border border-gray-200 p-4 text-left hover:shadow-sm transition"
            >
              <p className="text-sm text-gray-500">{j.company}</p>
              <h3 className="font-medium mt-1">{j.title}</h3>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="rounded-full border border-gray-300 px-2 py-0.5">{j.tag}</span>
                <span className="text-gray-700">{j.pkg}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
