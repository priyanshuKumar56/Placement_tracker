"use client"
import { Provider } from "react-redux"
import { type ReactNode, useMemo } from "react"
import { getStore } from "./index"

export default function StoreProvider({ children }: { children: ReactNode }) {
  const store = useMemo(() => getStore(), [])
  return <Provider store={store}>{children}</Provider>
}
