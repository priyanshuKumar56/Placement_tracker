"use client"

import type React from "react"
import { Provider } from "react-redux"
import { store, initFromStorage } from "@/lib/store"
import { useEffect } from "react"

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initFromStorage()
  }, [])
  return <Provider store={store}>{children}</Provider>
}
