import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CTA() {
  return (
    <section className="mt-12 rounded-xl border bg-blue-600 p-8 text-white">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-balance text-2xl font-semibold md:text-3xl">Ready to accelerate your placement?</h3>
          <p className="text-white/90">Build your profile, practice, and apply to the best roles today.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/register/student">
            <Button className="bg-white text-blue-700 hover:bg-white/90">Get Started</Button>
          </Link>
          <Link href="/jobs">
            <Button variant="secondary">Browse Jobs</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
