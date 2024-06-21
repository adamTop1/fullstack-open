import { configureStore } from '@reduxjs/toolkit'
import anecdoteSlice from './anecdoteSlice'
import filterSlice from './filterSlice'

const store = configureStore({
	reducer: {
		anecdotes: anecdoteSlice,
		filter: filterSlice,
	},
})

export default store
