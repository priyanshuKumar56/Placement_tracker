import { configureStore } from "@reduxjs/toolkit"
import { loadState, saveState } from "@/lib/local-storage"
import auth from "./slices/auth-slice"
import profile from "./slices/profile-slice"
import jobs from "./slices/jobs-slice"
import applications from "./slices/applications-slice"
import notifications from "./slices/notifications-slice"
import tpoAuth from "./slices/tpo-auth-slice"
import tpoRules from "./slices/tpo-rules-slice"
import companyAuth from "./slices/company-auth-slice"
import recruiter from "./slices/recruiter-slice"

const PERSIST_KEY = "unstop-student-state-v1"

export const makeStore = () =>
  configureStore({
    reducer: { auth, profile, jobs, applications, notifications, tpoAuth, tpoRules, companyAuth, recruiter },
    preloadedState: loadState(PERSIST_KEY, undefined as any),
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]

let store: AppStore | null = null

export function getStore(): AppStore {
  if (!store) {
    store = makeStore()
    store.subscribe(() => {
      const state = store!.getState()
      saveState(PERSIST_KEY, state)
    })
  }
  return store
}
