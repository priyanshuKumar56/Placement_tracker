"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Resume } from "../types"
import { newId } from "../mock-data"

type ResumeState = {
  items: Resume[]
}

const initialState: ResumeState = {
  items: [],
}

const slice = createSlice({
  name: "resumes",
  initialState,
  reducers: {
    hydrate(state, action: PayloadAction<ResumeState | undefined>) {
      if (action.payload) return action.payload
      return state
    },
    addResume(state, action: PayloadAction<Omit<Resume, "id">>) {
      state.items.push({ ...action.payload, id: newId() })
    },
    updateResume(state, action: PayloadAction<Resume>) {
      const idx = state.items.findIndex((r) => r.id === action.payload.id)
      if (idx >= 0) state.items[idx] = action.payload
    },
    removeResume(state, action: PayloadAction<{ id: string }>) {
      state.items = state.items.filter((r) => r.id !== action.payload.id)
    },
  },
})

export const { addResume, updateResume, removeResume, hydrate } = slice.actions
export default slice.reducer
