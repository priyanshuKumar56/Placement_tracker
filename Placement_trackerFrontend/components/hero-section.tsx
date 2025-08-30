"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useMemo, useState } from "react"

export default function HeroSection() {
  const slides = useMemo(
    () => [
      { src: "/resume-builder-preview.png", alt: "Resume builder preview" },
      { src: "/test-prep-dashboard.png", alt: "Test prep dashboard" },
      { src: "/job-board-listings.png", alt: "Job board listings" },
      { src: "/recruiter-dashboard.png", alt: "Recruiter dashboard" },
      { src: "/student-profile-preview.png", alt: "Student profile preview" },
    ],
    [],
  )

  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 3500)
    return () => clearInterval(id)
  }, [slides.length])

  function prev() {
    setIndex((i) => (i - 1 + slides.length) % slides.length)
  }
  function next() {
    setIndex((i) => (i + 1) % slides.length)
  }

  return (
    <header className="mx-auto mb-12 max-w-6xl">
      <div className="grid grid-cols-1 items-center gap-6 rounded-lg border bg-card p-6 md:grid-cols-2 md:p-10">
        {/* Left content */}
        <div>
          <h1 className="font-serif text-3xl font-bold text-balance md:text-5xl">
            Launch your career. Hire great talent.
          </h1>
          <p className="mt-3 max-w-prose text-pretty text-muted-foreground">
            Build standout resumes, practice with test prep, and connect with top opportunities. Recruiters can post
            jobs and hire faster.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/tools/resume-builder">Start Building Your Resume</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/jobs">Browse Jobs</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/company/register">Find Top Talent</Link>
            </Button>
          </div>
        </div>

        {/* Right slider */}
        <div className="relative w-full">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-md border">
            <img
              src={slides[index].src || "/placeholder.svg"}
              alt={slides[index].alt}
              className="h-full w-full object-cover transition-opacity duration-300"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-md ring-inset ring-1 ring-black/5" />
          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full ${i === index ? "bg-primary" : "bg-muted"}`}
                style={{ pointerEvents: "auto" }}
              />
            ))}
          </div>
          <div className="absolute inset-y-0 left-2 flex items-center">
            <button
              aria-label="Previous slide"
              onClick={prev}
              className="rounded-full border bg-background/80 px-2 py-1 text-xs"
            >
              {"<"}
            </button>
          </div>
          <div className="absolute inset-y-0 right-2 flex items-center">
            <button
              aria-label="Next slide"
              onClick={next}
              className="rounded-full border bg-background/80 px-2 py-1 text-xs"
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
