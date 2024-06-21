import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../feature/anecdoteSlice'

const AnecdoteList = () => {
	const anecdotes = useSelector(state => state.anecdotes)
	const filterAnecdotes = useSelector(state => state.filter)
	const dispatch = useDispatch()

	const vote = id => {
		dispatch(addVote(id))
	}

	const sortedAnecdotes = anecdotes
		.filter(anecdote => anecdote.content.toLowerCase().includes(filterAnecdotes.toLowerCase()))
		.sort((a, b) => b.votes - a.votes)

	return (
		<>
			{sortedAnecdotes.map(anecdote => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
		</>
	)
}

export default AnecdoteList
