import { createSlice } from "@reduxjs/toolkit"

const initialState = 'This is a notification'

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		doSmth: (state, action) => {
			return state
		},
	},
})

export default notificationSlice.reducer
