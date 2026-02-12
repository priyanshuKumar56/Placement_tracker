"use client"

import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMemo, useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { register as registerAction } from "@/lib/slices/auth-slice"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Stepper } from "@/components/register/stepper"
import { AccountStep } from "@/components/register/student/account-step"
import { EducationStep } from "@/components/register/student/education-step"
import { PreferencesStep } from "@/components/register/student/preferences-step"

const BRANCHES: Record<string, string[]> = {
  "B.Tech": ["Computer Science", "Information Technology", "Electronics", "Mechanical", "Civil"],
  "B.Sc": ["CS", "Maths", "Physics", "Statistics"],
  "M.Tech": ["CS", "AI/ML", "Data Science", "Networks"],
}

const DRAFT_KEY = "pptracker_register_student_draft"

export default function StudentRegister() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [step, setStep] = useState(1)

  // step 1
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // step 2
  const [degree, setDegree] = useState("B.Tech")
  const branches = useMemo(() => BRANCHES[degree] || [], [degree])
  const [branch, setBranch] = useState("")
  const [college, setCollege] = useState("")
  const [cgpa, setCgpa] = useState<string>("")
  const [backlogs, setBacklogs] = useState<string>("0")
  const [gradYear, setGradYear] = useState<string>("2025")

  // step 3
  const [experienceLevel, setExperienceLevel] = useState<"fresher" | "experienced">("fresher")
  const [yearsOfExperience, setYearsOfExperience] = useState<string>("0")
  const [preferredDomain, setPreferredDomain] = useState("Software")
  const [preferredLocation, setPreferredLocation] = useState("Bengaluru")

  useEffect(() => {
    setBranch("")
  }, [degree])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY)
      if (raw) {
        const d = JSON.parse(raw)
        setStep(d.step ?? 1)
        setName(d.name ?? "")
        setEmail(d.email ?? "")
        setPassword(d.password ?? "")
        setDegree(d.degree ?? "B.Tech")
        setBranch(d.branch ?? "")
        setCollege(d.college ?? "")
        setCgpa(d.cgpa ?? "")
        setBacklogs(d.backlogs ?? "0")
        setGradYear(d.gradYear ?? "2025")
        setExperienceLevel(d.experienceLevel ?? "fresher")
        setYearsOfExperience(d.yearsOfExperience ?? "0")
        setPreferredDomain(d.preferredDomain ?? "Software")
        setPreferredLocation(d.preferredLocation ?? "Bengaluru")
      }
    } catch {}
  }, [])

  useEffect(() => {
    const draft = {
      step,
      name,
      email,
      password,
      degree,
      branch,
      college,
      cgpa,
      backlogs,
      gradYear,
      experienceLevel,
      yearsOfExperience,
      preferredDomain,
      preferredLocation,
    }
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
    } catch {}
  }, [
    step,
    name,
    email,
    password,
    degree,
    branch,
    college,
    cgpa,
    backlogs,
    gradYear,
    experienceLevel,
    yearsOfExperience,
    preferredDomain,
    preferredLocation,
  ])

  const steps = ["Account", "Education", "Preferences"]

  function canContinueFrom(stepIdx: number) {
    if (stepIdx === 1) return name.trim() && /\S+@\S+\.\S+/.test(email) && password.length >= 6
    if (stepIdx === 2) return degree && (branch || branches[0]) && college && cgpa !== "" && gradYear
    if (stepIdx === 3) {
      if (experienceLevel === "experienced") return Number.parseInt(yearsOfExperience || "0", 10) >= 1
      return true
    }
    return true
  }

  function next() {
    if (!canContinueFrom(step)) return
    setStep((s) => Math.min(s + 1, 3))
  }
  function prev() {
    setStep((s) => Math.max(s - 1, 1))
  }

  function submit() {
    if (!canContinueFrom(3)) return
    try {
      dispatch(
        registerAction({
          role: "student",
          name,
          email,
          password,
          cgpa: Number.parseFloat(cgpa || "0"),
          backlogs: Number.parseInt(backlogs || "0", 10),
          department: branch || branches[0] || "CSE",
          degree,
          branch: branch || branches[0] || "CSE",
          college,
          graduationYear: gradYear,
          experienceLevel,
          yearsOfExperience: Number.parseInt(yearsOfExperience || "0", 10),
        } as any),
      )
      try {
        localStorage.removeItem(DRAFT_KEY)
      } catch {}
      router.push("/profile")
    } catch (e: any) {
      alert(e.message || "Failed to register")
    }
  }

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <Card>
          <CardHeader className="flex items-start justify-between gap-4">
            <div>
              <CardTitle>Student Registration</CardTitle>
              <div className="mt-2">
                <Stepper steps={steps} current={step} />
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Switch role:{" "}
              <Link className="hover:underline" href="/register/admin">
                Admin
              </Link>{" "}
              |{" "}
              <Link className="hover:underline" href="/register/company">
                Company
              </Link>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6">
            {step === 1 && (
              <AccountStep
                name={name}
                email={email}
                password={password}
                onName={setName}
                onEmail={setEmail}
                onPassword={setPassword}
                onNext={next}
                canContinue={canContinueFrom(1)}
              />
            )}

            {step === 2 && (
              <EducationStep
                degree={degree}
                onDegree={setDegree}
                branches={branches}
                branch={branch}
                onBranch={setBranch}
                college={college}
                onCollege={setCollege}
                cgpa={cgpa}
                onCgpa={setCgpa}
                backlogs={backlogs}
                onBacklogs={setBacklogs}
                gradYear={gradYear}
                onGradYear={setGradYear}
                onNext={next}
                onBack={prev}
                canContinue={canContinueFrom(2)}
              />
            )}

            {step === 3 && (
              <PreferencesStep
                experienceLevel={experienceLevel}
                onExperienceLevel={setExperienceLevel}
                yearsOfExperience={yearsOfExperience}
                onYearsOfExperience={setYearsOfExperience}
                preferredDomain={preferredDomain}
                onPreferredDomain={setPreferredDomain}
                preferredLocation={preferredLocation}
                onPreferredLocation={setPreferredLocation}
                onBack={prev}
                onSubmit={submit}
                canSubmit={canContinueFrom(3)}
              />
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
