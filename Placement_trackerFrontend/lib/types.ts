export type Role = "student" | "admin" | "company"

export type User = {
  id: string
  name: string
  email: string
  password: string
  role: Role
  cgpa?: number
  backlogs?: number
  department?: string
  // dynamic registration extras
  degree?: string
  branch?: string
  college?: string
  graduationYear?: string
  experienceLevel?: "fresher" | "experienced"
  yearsOfExperience?: number
  companyName?: string
}

export type Resume = {
  id: string
  userId: string
  title: string
  data: {
    objective?: string
    academics?: { institute: string; degree: string; year: string; score?: string }[]
    skills?: string[]
    projects?: { title: string; desc: string; link?: string }[]
    achievements?: string[]
    certifications?: string[]
  }
}

export type Tier = "tier-1" | "tier-2" | "tier-3" | "internship"

export type Job = {
  id: string
  title: string
  company: string
  location: string
  domain: string
  description: string
  salaryLPA?: number
  tier: Tier
  type: "full-time" | "internship"
  eligibility: {
    minCgpa?: number
    maxBacklogs?: number
    departments?: string[]
    skills?: string[]
  }
  approved?: boolean
  postedBy?: string
  deadline?: string
}

export type ApplicationStage = "applied" | "test" | "shortlisted" | "interview" | "offer" | "joined"

export type Application = {
  id: string
  userId: string
  jobId: string
  resumeId?: string
  stage: ApplicationStage
  timestamps: Partial<Record<ApplicationStage, string>>
  offerTier?: Tier
  finalPlaced?: boolean
}

export type Notification = {
  id: string
  userId: string
  title: string
  message: string
  createdAt: string
  read?: boolean
}
