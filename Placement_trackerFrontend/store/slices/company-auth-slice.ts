import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type CompanyUser = { id: string; name: string; email: string }
type CompanyAuthState = { user: CompanyUser | null }

const initialState: CompanyAuthState = { user: null }

const companyAuthSlice = createSlice({
  name: "companyAuth",
  initialState,
  reducers: {
    companyRegister: (state, action: PayloadAction<{ name: string; email: string }>) => {
      state.user = { id: crypto.randomUUID(), ...action.payload }
    },
    companyLogin: (state, action: PayloadAction<{ email: string }>) => {
      state.user = { id: crypto.randomUUID(), name: action.payload.email.split("@")[0], email: action.payload.email }
    },
    companyLogout: (state) => {
      state.user = null
    },
  },
})

export const { companyRegister, companyLogin, companyLogout } = companyAuthSlice.actions
export default companyAuthSlice.reducer
