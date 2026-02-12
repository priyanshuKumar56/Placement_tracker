import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type TpoAuthState = {
  isAuthenticated: boolean
  email?: string
  name?: string
}

const initialState: TpoAuthState = { isAuthenticated: false }

const tpoAuthSlice = createSlice({
  name: "tpoAuth",
  initialState,
  reducers: {
    tpoRegister(state, action: PayloadAction<{ email: string; name: string }>) {
      state.isAuthenticated = true
      state.email = action.payload.email
      state.name = action.payload.name
    },
    tpoLogin(state, action: PayloadAction<{ email: string }>) {
      state.isAuthenticated = true
      state.email = action.payload.email
    },
    tpoLogout(state) {
      state.isAuthenticated = false
      state.email = undefined
      state.name = undefined
    },
  },
})

export const { tpoRegister, tpoLogin, tpoLogout } = tpoAuthSlice.actions
export default tpoAuthSlice.reducer
