import { configureStore } from '@reduxjs/toolkit'
import anecdoteSlice from './anecdoteSlice'
import filterSlice from './filterSlice'
import notificationSlice from './notoficationSlice'
const store = configureStore({
	reducer: {
		anecdotes: anecdoteSlice,
		filter: filterSlice,
		notification: notificationSlice,
	},
})

export default store
