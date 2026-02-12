import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import HeroSection from "@/components/hero-section"

export default function Home() {
  return (
    <main className="px-4 py-10">
      <HeroSection />
      {/* Trusted By */}
      

      <div className="mx-auto grid max-w-6xl gap-8">
        {/* Feature Grid */}
        <section aria-labelledby="features-title" className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {[
            {
              title: "Resume Builder",
              desc: "Create polished resumes, import from PDF, and export tailored versions.",
              href: "/tools/resume-builder",
              img: "/resume-builder-preview.png",
            },
            {
              title: "Test Preparation",
              desc: "Practice aptitude, coding challenges, and interview patterns.",
              href: "/tests/prep",
              img: "/test-prep-dashboard.png",
            },
            {
              title: "Job Listings",
              desc: "Explore curated roles for students and fresh graduates.",
              href: "/jobs",
              img: "/job-board-listings.png",
            },
            {
              title: "Profiles",
              desc: "Build comprehensive profiles with skills, projects, and achievements.",
              href: "/profile",
              img: "/student-profile-preview.png",
            },
          ].map((f) => (
            <Card key={f.title} className="flex flex-col">
              <CardHeader>
                <CardTitle className="font-serif">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex grow flex-col gap-3">
                <p className="text-sm text-muted-foreground">{f.desc}</p>
                <img
                  src={f.img || "/placeholder.svg"}
                  alt={`${f.title} preview`}
                  className="w-full rounded-md border"
                />
                <div className="mt-auto">
                  <Button asChild variant="secondary">
                    <Link href={f.href}>Open</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Categories */}
        <section aria-labelledby="categories-title" className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <h2 id="categories-title" className="sr-only">
            Categories
          </h2>
          {[
            { name: "Technology", query: "technology jobs illustration", href: "/jobs?category=technology" },
            { name: "Business", query: "business jobs illustration", href: "/jobs?category=business" },
            { name: "Design", query: "design jobs illustration", href: "/jobs?category=design" },
            { name: "Marketing", query: "marketing jobs illustration", href: "/jobs?category=marketing" },
            { name: "Finance", query: "finance jobs illustration", href: "/jobs?category=finance" },
            { name: "Healthcare", query: "healthcare jobs illustration", href: "/jobs?category=healthcare" },
          ].map((c) => (
            <Card key={c.name}>
              <CardHeader>
                <CardTitle className="font-serif">{c.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <img
                  src={`/abstract-geometric-shapes.png?height=140&width=480&query=${encodeURIComponent(c.query)}`}
                  alt={`${c.name} category`}
                  className="w-full rounded-md border"
                />
                <Button asChild>
                  <Link href={c.href}>Explore {c.name}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Recent Jobs Preview */}
        <section aria-labelledby="recent-jobs-title" className="space-y-4">
          <h2 id="recent-jobs-title" className="font-serif text-2xl">
            Recent Jobs
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { role: "Frontend Intern", company: "Acme Corp", location: "Remote", date: "2d ago" },
              { role: "Data Analyst", company: "Globex", location: "NY, USA", date: "3d ago" },
              { role: "UX Designer", company: "Umbrella", location: "Berlin, DE", date: "5d ago" },
            ].map((j) => (
              <Card key={j.role}>
                <CardHeader>
                  <CardTitle className="font-serif text-xl">{j.role}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-sm text-muted-foreground">
                  <p>
                    <span className="text-foreground">{j.company}</span> • {j.location}
                  </p>
                  <p>Posted {j.date}</p>
                  <div className="pt-2">
                    <Button asChild size="sm">
                      <Link href="/jobs">{"View details"}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section aria-labelledby="how-title" className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <h2 id="how-title" className="font-serif text-2xl">
              How it works for Students
            </h2>
            <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>1. Create your profile and import your resume.</li>
              <li>2. Practice with test prep to strengthen your skills.</li>
              <li>3. Apply to jobs and track your applications.</li>
            </ol>
            <div className="mt-4">
              <Button asChild>
                <Link href="/register">Create Student Account</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h2 className="font-serif text-2xl">How it works for Recruiters</h2>
            <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>1. Register your company and set up your profile.</li>
              <li>2. Post jobs and manage applicants in your dashboard.</li>
              <li>3. Shortlist candidates and streamline hiring.</li>
            </ol>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild variant="outline">
                <Link href="/company/register">Recruiter Register</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/company/login">Recruiter Login</Link>
              </Button>
            </div>
          </div>
        </section>

        <section aria-labelledby="roles-title" className="mx-auto max-w-6xl space-y-4">
          <h2 id="roles-title" className="font-serif text-2xl">
            Explore by role
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Students</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>Build your profile, create resumes, prep for tests, and apply to jobs.</p>
                <div className="flex gap-2">
                  <Button asChild>
                    <Link href="/register">Create Account</Link>
                  </Button>
                  <Button asChild variant="secondary">
                    <Link href="/login">Login</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Recruiters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>Register your company, post jobs, manage applicants, and hire faster.</p>
                <div className="flex gap-2">
                  <Button asChild variant="outline">
                    <Link href="/company/register">Register</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/company/login">Login</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif">TPO Admin</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>Set placement rules, approve jobs, and monitor student applications.</p>
                <div className="flex gap-2">
                  <Button asChild variant="secondary">
                    <Link href="/tpo/login">TPO Login</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/tpo/register">Register</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials */}
        <section aria-labelledby="testimonials-title" className="space-y-4">
          <h2 id="testimonials-title" className="font-serif text-2xl">
            What users say
          </h2>
          <div className="flex gap-4 overflow-x-auto py-1 [scrollbar-width:none] [-ms-overflow-style:none]">
            {[
              {
                quote: "The resume builder helped me land my first internship!",
                name: "Aisha, Student",
              },
              {
                quote: "Posting roles and reviewing candidates is smooth and fast.",
                name: "Rahul, Recruiter",
              },
              {
                quote: "The test prep section improved my coding interview skills.",
                name: "Mina, Graduate",
              },
            ].map((t, idx) => (
              <Card key={idx} className="min-w-[280px] max-w-sm">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">“{t.quote}”</p>
                  <p className="mt-3 text-sm font-medium text-foreground">{t.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Metrics */}
        <section aria-labelledby="metrics-title" className="space-y-4">
          <h2 id="metrics-title" className="font-serif text-2xl">
            By the numbers
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { value: "25k+", label: "Resumes created" },
              { value: "4.8/5", label: "Avg user rating" },
              { value: "3k+", label: "Jobs posted" },
              { value: "1.2k+", label: "Companies hiring" },
            ].map((m) => (
              <div key={m.label} className="rounded-lg border bg-card p-6 text-center">
                <div className="font-serif text-2xl">{m.value}</div>
                <div className="text-sm text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-title" className="space-y-4">
          <h2 id="faq-title" className="font-serif text-2xl">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="q1">
              <AccordionTrigger>Is the resume builder free?</AccordionTrigger>
              <AccordionContent>
                Yes. You can create and export resumes for free. Premium templates may be added later.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>Can recruiters contact students directly?</AccordionTrigger>
              <AccordionContent>
                Yes. Recruiters can message candidates once they apply to a job or are shortlisted.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>Do you offer interview practice?</AccordionTrigger>
              <AccordionContent>
                The test prep section includes aptitude, coding challenges, and interview patterns to help you prepare.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* CTA Banner */}
        <section className="rounded-lg bg-primary text-primary-foreground p-6 md:p-10">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-2xl md:text-3xl">Ready to accelerate your journey?</h2>
            <p className="mt-2 text-primary-foreground/90">
              Join thousands of students and recruiters using our platform to build better careers and teams.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild variant="secondary">
                <Link href="/register">Create Student Account</Link>
              </Button>
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/company/register">Create Recruiter Account</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-6 grid grid-cols-1 gap-6 rounded-lg border bg-card p-6 md:grid-cols-4">
          <div>
            <div className="font-serif text-lg">Career Platform</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Tools for students and recruiters to connect, learn, and hire.
            </p>
          </div>
          <div>
            <div className="font-medium">Product</div>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/tools/resume-builder" className="hover:text-foreground">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/tests/prep" className="hover:text-foreground">
                  Test Preparation
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-foreground">
                  Job Board
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-medium">Recruiters</div>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/company/register" className="hover:text-foreground">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/company/login" className="hover:text-foreground">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/company/dashboard" className="hover:text-foreground">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-medium">Company</div>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </main>
  )
}
