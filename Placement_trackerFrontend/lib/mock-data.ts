import type { Job, Tier, User } from "./types"

export const newId = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36)

const tiers: Tier[] = ["tier-1", "tier-2", "tier-3", "internship"]

export const mockUsers: User[] = [
  {
    id: "u-student-1",
    name: "Aarav",
    email: "aarav@example.com",
    password: "password",
    role: "student",
    cgpa: 8.4,
    backlogs: 0,
    department: "CSE",
  },
  { id: "u-admin-1", name: "TPO Admin", email: "tpo@example.com", password: "password", role: "admin" },
  { id: "u-company-1", name: "Acme HR", email: "hr@acme.com", password: "password", role: "company" },
]

export const mockJobs: Job[] = [
  {
    id: "j-1",
    title: "Frontend Engineer",
    company: "Acme Corp",
    location: "Bengaluru",
    domain: "Software",
    description: "Build delightful UIs with React and TypeScript.",
    salaryLPA: 18,
    tier: "tier-1",
    type: "full-time",
    eligibility: { minCgpa: 7.5, maxBacklogs: 0, departments: ["CSE", "ECE"], skills: ["React", "TypeScript"] },
    approved: true,
    postedBy: "u-company-1",
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
  },
  {
    id: "j-2",
    title: "Backend Developer",
    company: "DataWorks",
    location: "Hyderabad",
    domain: "Software",
    description: "APIs, databases, and distributed systems.",
    salaryLPA: 12,
    tier: "tier-2",
    type: "full-time",
    eligibility: { minCgpa: 7.0, maxBacklogs: 1, departments: ["CSE", "IT"], skills: ["Node.js", "SQL"] },
    approved: true,
    postedBy: "u-company-1",
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
  {
    id: "j-3",
    title: "SDE Intern",
    company: "CloudNine",
    location: "Remote",
    domain: "Software",
    description: "Work on cloud-native microservices.",
    tier: "internship",
    type: "internship",
    eligibility: { minCgpa: 7.0, maxBacklogs: 2, departments: ["CSE", "ECE", "IT"], skills: ["Go", "Kubernetes"] },
    approved: true,
    postedBy: "u-company-1",
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: "j-4",
    title: "QA Engineer",
    company: "QualityHub",
    location: "Pune",
    domain: "Software",
    description: "Test automation and quality engineering.",
    salaryLPA: 6,
    tier: "tier-3",
    type: "full-time",
    eligibility: { minCgpa: 6.5, maxBacklogs: 2, departments: ["CSE", "ECE", "IT"], skills: ["Selenium"] },
    approved: true,
    postedBy: "u-company-1",
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20).toISOString(),
  },
]
