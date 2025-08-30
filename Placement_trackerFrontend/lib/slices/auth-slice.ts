"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { User } from "../types"
import { mockUsers, newId } from "../mock-data"

type AuthState = {
  currentUser?: User
  users: User[]
}

const initialState: AuthState = {
  currentUser: undefined,
  users: mockUsers,
}

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrate(state, action: PayloadAction<AuthState | undefined>) {
      if (action.payload) return action.payload
      return state
    },
    register(state, action: PayloadAction<Omit<User, "id">>) {
      const exists = state.users.find((u) => u.email === action.payload.email)
      if (exists) throw new Error("User already exists")
      const user: User = { id: newId(), ...action.payload }
      state.users.push(user)
      state.currentUser = user
    },
    login(state, action: PayloadAction<{ email: string; password: string }>) {
      const user = state.users.find((u) => u.email === action.payload.email && u.password === action.payload.password)
      if (!user) throw new Error("Invalid credentials")
      state.currentUser = user
    },
    logout(state) {
      state.currentUser = undefined
    },
    updateProfile(state, action: PayloadAction<Partial<User>>) {
      if (!state.currentUser) return
      const idx = state.users.findIndex((u) => u.id === state.currentUser!.id)
      if (idx >= 0) {
        state.users[idx] = { ...state.users[idx], ...action.payload }
        state.currentUser = state.users[idx]
      }
    },
  },
})

export const { register, login, logout, updateProfile, hydrate } = slice.actions
export default slice.reducer
