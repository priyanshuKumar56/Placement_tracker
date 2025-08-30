import { createSlice, type PayloadAction, nanoid } from "@reduxjs/toolkit"

export type Job = {
  id: string
  title: string
  company: string
  location: string
  type: "full-time" | "internship" | "contract"
  tags: string[]
  description: string
  postedAt: string
  salary?: number | null
  isApproved?: boolean // new flag controlled by TPO
}

export type JobFilters = {
  query: string
  locations: string[]
  types: ("full-time" | "internship" | "contract")[]
  tags: string[]
  minSalary?: number | null
  maxSalary?: number | null
}

type JobsState = {
  items: Job[]
  selectedId: string | null
  filters: JobFilters
}

const sampleJobs: Job[] = [
  {
    id: nanoid(),
    title: "Frontend Engineer",
    company: "TechNova",
    location: "Remote",
    type: "full-time",
    tags: ["React", "TypeScript", "Redux"],
    description: "Build delightful UIs with React and modern tooling.",
    postedAt: new Date().toISOString(),
    salary: 12,
    isApproved: true, //
  },
  {
    id: nanoid(),
    title: "Software Intern",
    company: "CloudNine",
    location: "Bengaluru",
    type: "internship",
    tags: ["JavaScript", "Node.js"],
    description: "Work with mentors on real-world Node.js projects.",
    postedAt: new Date().toISOString(),
    salary: 4,
    isApproved: true, //
  },
  {
    id: nanoid(),
    title: "Backend Engineer",
    company: "DataForge",
    location: "Hyderabad",
    type: "full-time",
    tags: ["Node.js", "PostgreSQL", "APIs"],
    description: "Design and implement robust API services with Node.js.",
    postedAt: new Date().toISOString(),
    salary: 15,
    isApproved: true, //
  },
  {
    id: nanoid(),
    title: "Full Stack Developer",
    company: "BuildStack",
    location: "Remote",
    type: "contract",
    tags: ["React", "Node.js", "Tailwind"],
    description: "Contract role to ship features end-to-end.",
    postedAt: new Date().toISOString(),
    salary: 18,
    isApproved: true, //
  },
  {
    id: nanoid(),
    title: "Mobile Intern",
    company: "AppWorks",
    location: "Pune",
    type: "internship",
    tags: ["React Native", "Android"],
    description: "Assist with React Native feature development and QA.",
    postedAt: new Date().toISOString(),
    salary: 3,
    isApproved: true, //
  },
  {
    id: nanoid(),
    title: "Data Analyst",
    company: "InsightIQ",
    location: "Gurugram",
    type: "full-time",
    tags: ["SQL", "Python", "BI"],
    description: "Transform data into insights and dashboards.",
    postedAt: new Date().toISOString(),
    salary: 10,
    isApproved: true, //
  },
]

const initialState: JobsState = {
  items: sampleJobs,
  selectedId: null,
  filters: { query: "", locations: [], types: [], tags: [], minSalary: null, maxSalary: null },
}

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<JobFilters>>) {
      state.filters = { ...state.filters, ...action.payload }
    },
    setSelected(state, action: PayloadAction<string | null>) {
      state.selectedId = action.payload
    },
    addJob(state, action: PayloadAction<Job>) {
      state.items.unshift(action.payload)
    },
    toggleApproveJob(state, action: PayloadAction<string>) {
      const j = state.items.find((x) => x.id === action.payload)
      if (j) j.isApproved = !j.isApproved //
    },
  },
})

export const { setFilters, setSelected, addJob, toggleApproveJob } = jobsSlice.actions
export default jobsSlice.reducer
