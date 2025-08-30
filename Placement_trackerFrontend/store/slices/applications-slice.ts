import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Job } from "./jobs-slice"

export type ApplicationStatus = "applied" | "under_review" | "shortlisted" | "rejected" | "hired"

export type Application = {
  id: string
  jobId: string
  jobTitle: string
  company: string
  submittedAt: string
  status: ApplicationStatus
  answers?: Record<string, string>
}

type ApplicationsState = {
  items: Application[]
}

const initialState: ApplicationsState = {
  items: [],
}

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    applyToJob(
      state,
      action: PayloadAction<{ job: Job; id?: string; answers?: Record<string, string> }>, // added optional id
    ) {
      const { job, answers, id } = action.payload
      state.items.unshift({
        id: id ?? `${job.id}-${Date.now()}`, // use provided id if present
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        submittedAt: new Date().toISOString(),
        status: "applied",
        answers,
      })
    },
    updateStatus(state, action: PayloadAction<{ id: string; status: ApplicationStatus }>) {
      const a = state.items.find((x) => x.id === action.payload.id)
      if (a) a.status = action.payload.status
    },
  },
})

export const { applyToJob, updateStatus } = applicationsSlice.actions
export default applicationsSlice.reducer
