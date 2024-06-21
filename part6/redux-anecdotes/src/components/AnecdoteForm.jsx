import React from 'react'
import { addAnecdote } from '../feature/anecdoteSlice'
import { useDispatch } from 'react-redux'
import { useRef } from 'react'

const AnecdoteForm = () => {
	const dispatch = useDispatch()
	const anecdoteInput = useRef()

	const addNewAnecode = e => {
		e.preventDefault()
		dispatch(addAnecdote(anecdoteInput.current.value))
		anecdoteInput.current.value = ''
	}

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={addNewAnecode}>
				<div>
					<input ref={anecdoteInput} />
				</div>
				<button>create</button>
			</form>
		</>
	)
}

export default AnecdoteForm
