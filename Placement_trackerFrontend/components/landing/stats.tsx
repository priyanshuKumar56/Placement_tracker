export function LandingStats() {
  const stats = [
    { k: "Opportunities", v: "1,200+" },
    { k: "Companies", v: "300+" },
    { k: "Students placed", v: "5,000+" },
    { k: "Avg. package", v: "₹9.2 LPA" },
  ]
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.k} className="rounded-lg border border-gray-200 p-4 text-center">
              <p className="text-2xl font-semibold">{s.v}</p>
              <p className="text-sm text-gray-600">{s.k}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
