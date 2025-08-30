"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Job } from "../types"
import { mockJobs, newId } from "../mock-data"

type JobsState = {
  items: Job[]
}

const initialState: JobsState = {
  items: mockJobs,
}

const slice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    hydrate(state, action: PayloadAction<JobsState | undefined>) {
      if (action.payload) return action.payload
      return state
    },
    addJob(state, action: PayloadAction<Omit<Job, "id" | "approved">>) {
      state.items.push({ ...action.payload, id: newId(), approved: false })
    },
    approveJob(state, action: PayloadAction<{ id: string; approved: boolean }>) {
      const j = state.items.find((i) => i.id === action.payload.id)
      if (j) j.approved = action.payload.approved
    },
    updateJob(state, action: PayloadAction<Job>) {
      const idx = state.items.findIndex((j) => j.id === action.payload.id)
      if (idx >= 0) state.items[idx] = action.payload
    },
    removeJob(state, action: PayloadAction<string>) {
      state.items = state.items.filter((j) => j.id !== action.payload)
    },
  },
})

export const { addJob, approveJob, updateJob, removeJob, hydrate } = slice.actions
export default slice.reducer
