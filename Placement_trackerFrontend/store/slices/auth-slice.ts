import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type StudentUser = {
  id: string
  name: string
  email: string
}

type AuthState = {
  user: StudentUser | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register(state, action: PayloadAction<StudentUser>) {
      state.user = action.payload
      state.isAuthenticated = true
    },
    login(state, action: PayloadAction<StudentUser>) {
      state.user = action.payload
      state.isAuthenticated = true
    },
    logout(state) {
      state.user = null
      state.isAuthenticated = false
    },
    updateUser(state, action: PayloadAction<Partial<StudentUser>>) {
      if (state.user) state.user = { ...state.user, ...action.payload }
    },
  },
})

export const { register, login, logout, updateUser } = authSlice.actions
export default authSlice.reducer
