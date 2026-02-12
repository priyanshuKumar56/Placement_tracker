import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type RecruiterJob = {
  id: string
  companyId: string
  title: string
  description?: string
  location: string
  type: "Full-time" | "Internship" | "Part-time" | "Contract"
  salaryMin?: number | null
  salaryMax?: number | null
  skills?: string[]
  eligibility?: { cgpaMin?: number; backlogsAllowed?: boolean; dept?: string[] }
  deadline?: string
  tags?: string[]
  approved?: boolean
}

export type ApplicantRef = { id: string; applicationId: string; studentId?: string; jobId: string; status: string }

export type Interview = {
  id: string
  jobId: string
  candidateId?: string
  date: string
  mode: "Online" | "Offline" | "Test" | "GD"
  notes?: string
}
export type Offer = {
  id: string
  jobId: string
  candidateId?: string
  ctc: number
  role: string
  joining: string
  status: "Offered" | "Accepted" | "Rejected"
}

type RecruiterState = {
  jobs: RecruiterJob[]
  applicants: ApplicantRef[]
  interviews: Interview[]
  offers: Offer[]
}

const initialState: RecruiterState = { jobs: [], applicants: [], interviews: [], offers: [] }

const recruiterSlice = createSlice({
  name: "recruiter",
  initialState,
  reducers: {
    postJob: (state, action: PayloadAction<RecruiterJob>) => {
      state.jobs.push({ ...action.payload, approved: false })
    },
    approveJobLocal: (state, action: PayloadAction<{ jobId: string; approved: boolean }>) => {
      const j = state.jobs.find((j) => j.id === action.payload.jobId)
      if (j) j.approved = action.payload.approved
    },
    addApplicant: (state, action: PayloadAction<ApplicantRef>) => {
      state.applicants.unshift({ ...action.payload, id: crypto.randomUUID() })
    },
    setApplicantStatus: (state, action: PayloadAction<{ id: string; status: string }>) => {
      const a = state.applicants.find((x) => x.id === action.payload.id)
      if (a) a.status = action.payload.status
    },
    scheduleInterview: (state, action: PayloadAction<Interview>) => {
      state.interviews.push({ ...action.payload, id: crypto.randomUUID() })
    },
    addOffer: (state, action: PayloadAction<Offer>) => {
      state.offers.push({ ...action.payload, id: crypto.randomUUID() })
    },
    setOfferStatus: (state, action: PayloadAction<{ id: string; status: Offer["status"] }>) => {
      const o = state.offers.find((x) => x.id === action.payload.id)
      if (o) o.status = action.payload.status
    },
  },
})

export const {
  postJob,
  approveJobLocal,
  addApplicant,
  setApplicantStatus,
  scheduleInterview,
  addOffer,
  setOfferStatus,
} = recruiterSlice.actions
export default recruiterSlice.reducer
