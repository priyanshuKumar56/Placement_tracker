"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Application, ApplicationStage, Tier } from "../types"
import { newId } from "../mock-data"

type AppState = {
  items: Application[]
  upgrades: Record<string, number>
  placedTier: Record<string, Tier | undefined>
}

const initialState: AppState = {
  items: [],
  upgrades: {},
  placedTier: {},
}

function tierRank(t?: Tier) {
  if (!t) return 0
  return t === "tier-1" ? 3 : t === "tier-2" ? 2 : t === "tier-3" ? 1 : 0
}

const slice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    hydrate(state, action: PayloadAction<AppState | undefined>) {
      if (action.payload) return action.payload
      return state
    },
    apply(state, action: PayloadAction<{ userId: string; jobId: string; resumeId?: string; jobTier?: Tier }>) {
      const { userId, jobId, resumeId, jobTier } = action.payload
      const finalTier = state.placedTier[userId]
      if (finalTier && jobTier && tierRank(jobTier) < tierRank(finalTier)) {
        throw new Error("Cannot apply for lower tier after being placed.")
      }
      const upCount = state.upgrades[userId] || 0
      if (jobTier && finalTier && tierRank(jobTier) > tierRank(finalTier) && upCount >= 2) {
        throw new Error("Maximum upgrades reached (2).")
      }
      const exists = state.items.find((a) => a.userId === userId && a.jobId === jobId)
      if (exists) throw new Error("Already applied to this job.")
      const now = new Date().toISOString()
      state.items.push({
        id: newId(),
        userId,
        jobId,
        resumeId,
        stage: "applied",
        timestamps: { applied: now },
      })
    },
    advanceStage(
      state,
      action: PayloadAction<{
        appId: string
        next: ApplicationStage
        offerTier?: Tier
        final?: boolean
        userId?: string
      }>,
    ) {
      const app = state.items.find((a) => a.id === action.payload.appId)
      if (!app) return
      app.stage = action.payload.next
      app.timestamps[action.payload.next] = new Date().toISOString()
      if (action.payload.next === "offer" && action.payload.offerTier && action.payload.userId) {
        const u = action.payload.userId
        const prev = state.placedTier[u]
        if (prev && tierRank(action.payload.offerTier) > tierRank(prev)) {
          state.upgrades[u] = (state.upgrades[u] || 0) + 1
        }
        state.placedTier[u] = action.payload.offerTier
      }
      if (action.payload.final && action.payload.userId && action.payload.offerTier === "tier-1") {
        state.placedTier[action.payload.userId] = "tier-1"
      }
    },
    markPlaced(state, action: PayloadAction<{ userId: string; tier: Tier }>) {
      state.placedTier[action.payload.userId] = action.payload.tier
    },
  },
})

export const { apply, advanceStage, markPlaced, hydrate } = slice.actions
export default slice.reducer
