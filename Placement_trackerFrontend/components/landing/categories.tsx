const CATS = [
  { title: "Software", desc: "SDE, Frontend, Backend, Full-stack", img: "/images/cat-software.jpg" },
  { title: "Data", desc: "Analyst, Scientist, Engineer", img: "/images/cat-data.jpg" },
  { title: "DevOps", desc: "SRE, Cloud, Platform", img: "/images/cat-devops.jpg" },
  { title: "Core", desc: "Electronics, Mechanical, Civil", img: "/images/cat-core.jpg" },
]

export function LandingCategories() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-pretty text-xl font-semibold md:text-2xl">Explore categories</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {CATS.map((c) => (
            <div
              key={c.title}
              className="group overflow-hidden rounded-lg border transition-all duration-500 hover:-translate-y-0.5 hover:shadow-sm"
            >
              <div className="h-28 w-full overflow-hidden">
                <img
                  src={c.img || "/placeholder.svg"}
                  alt={`${c.title} category`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
