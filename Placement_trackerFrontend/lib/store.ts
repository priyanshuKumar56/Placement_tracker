"use client"

import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/auth-slice"
import jobsReducer from "./slices/job-slice"
import appsReducer from "./slices/application-slice"
import notifReducer from "./slices/notification-slice"
import resumeReducer from "./slices/resume-slice"

const PERSIST_KEY = "placement-tracker-state-v1"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
    applications: appsReducer,
    notifications: notifReducer,
    resumes: resumeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export function initFromStorage() {
  try {
    const raw = localStorage.getItem(PERSIST_KEY)
    if (raw) {
      const state = JSON.parse(raw)
      store.dispatch({ type: "auth/hydrate", payload: state.auth })
      store.dispatch({ type: "jobs/hydrate", payload: state.jobs })
      store.dispatch({ type: "applications/hydrate", payload: state.applications })
      store.dispatch({ type: "notifications/hydrate", payload: state.notifications })
      store.dispatch({ type: "resumes/hydrate", payload: state.resumes })
    }
  } catch {}
}

let initialized = false
store.subscribe(() => {
  try {
    if (!initialized) initialized = true
    const state = store.getState()
    localStorage.setItem(PERSIST_KEY, JSON.stringify(state))
  } catch {}
})
