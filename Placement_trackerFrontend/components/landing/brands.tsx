export default function Brands() {
  return (
    <section className="mt-12 rounded-xl border bg-card p-6">
      <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <div>
          <h3 className="text-lg font-semibold">Hiring Partners</h3>
          <p className="text-sm text-muted-foreground">Top companies recruit from our platform</p>
        </div>
        <img src="/images/companies.jpg" alt="Hiring partners" className="h-20 w-full max-w-3xl rounded object-cover" />
      </div>
    </section>
  )
}
