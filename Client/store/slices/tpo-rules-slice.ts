import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type PlacementRules = {
  minCgpa?: number
  allowBacklogs?: boolean
  departments?: string[]
  maxOffers?: number
}

const initialState: { rules: PlacementRules } = {
  rules: {},
}

const tpoRulesSlice = createSlice({
  name: "tpoRules",
  initialState,
  reducers: {
    setRules(state, action: PayloadAction<Partial<PlacementRules>>) {
      state.rules = { ...state.rules, ...action.payload }
    },
  },
})

export const { setRules } = tpoRulesSlice.actions
export default tpoRulesSlice.reducer
