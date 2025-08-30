const STEPS = [
  { title: "Create profile", desc: "Register as Student, Company, or Admin." },
  { title: "Find opportunities", desc: "Search and filter jobs and internships." },
  { title: "Apply & track", desc: "Track your status from Applied to Offer." },
  { title: "Prepare & ace", desc: "Practice aptitude and coding tests." },
]

export function LandingHowItWorks() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-xl font-semibold">How it works</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.title} className="rounded-lg border border-gray-200 bg-white p-4">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border text-sm font-medium">
                {i + 1}
              </span>
              <h3 className="mt-2 font-medium">{s.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
