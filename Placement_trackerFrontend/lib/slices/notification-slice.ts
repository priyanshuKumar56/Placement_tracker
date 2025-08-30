"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Notification } from "../types"
import { newId } from "../mock-data"

type NotifState = {
  items: Notification[]
}

const initialState: NotifState = {
  items: [],
}

const slice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    hydrate(state, action: PayloadAction<NotifState | undefined>) {
      if (action.payload) return action.payload
      return state
    },
    notify(state, action: PayloadAction<{ userId: string; title: string; message: string }>) {
      state.items.unshift({
        id: newId(),
        userId: action.payload.userId,
        title: action.payload.title,
        message: action.payload.message,
        createdAt: new Date().toISOString(),
        read: false,
      })
    },
    markRead(state, action: PayloadAction<{ id: string }>) {
      const n = state.items.find((i) => i.id === action.payload.id)
      if (n) n.read = true
    },
    clearForUser(state, action: PayloadAction<{ userId: string }>) {
      state.items = state.items.filter((n) => n.userId !== action.payload.userId)
    },
  },
})

export const { notify, markRead, clearForUser, hydrate } = slice.actions
export default slice.reducer
