"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type Slide = {
  src: string
  alt: string
}

export default function HeroSlider() {
  const slides: Slide[] = useMemo(
    () => [
      { src: "/student-collaboration-resume-builder-ui.png", alt: "Students collaborating on resume builder" },
      { src: "/interview-practice-and-test-preparation-ui.png", alt: "Test preparation and interview practice module" },
      { src: "/recruiter-dashboard-posting-a-job.png", alt: "Recruiter dashboard creating a new job posting" },
    ],
    [],
  )

  const [index, setIndex] = useState(0)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    // Auto-advance every 5 seconds
    timer.current = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => {
      if (timer.current) window.clearInterval(timer.current)
    }
  }, [slides.length])

  // Preload to avoid flashes
  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = s.src
    })
  }, [slides])

  return (
    <div className="relative w-full overflow-hidden rounded-xl border bg-card">
      <div className="relative aspect-[4/3] w-full md:aspect-[5/4]">
        {slides.map((s, i) => (
          <img
            key={i}
            src={s.src || "/placeholder.svg?height=600&width=800&query=career%20platform%20hero"}
            alt={s.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== index}
          />
        ))}
      </div>

      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 w-2 rounded-full ${i === index ? "bg-primary" : "bg-white/80"}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  )
}
