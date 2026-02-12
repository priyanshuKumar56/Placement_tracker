import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type Notification = {
  id: string
  title: string
  message: string
  createdAt: string
  unread: boolean
}

type NotificationsState = {
  items: Notification[]
}

const initialState: NotificationsState = {
  items: [],
}

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    pushNotification(state, action: PayloadAction<{ title: string; message: string }>) {
      state.items.unshift({
        id: `${Date.now()}`,
        title: action.payload.title,
        message: action.payload.message,
        createdAt: new Date().toISOString(),
        unread: true,
      })
    },
    markAllRead(state) {
      state.items.forEach((n) => {
        n.unread = false
      })
    },
  },
})

export const { pushNotification, markAllRead } = notificationsSlice.actions
export default notificationsSlice.reducer
