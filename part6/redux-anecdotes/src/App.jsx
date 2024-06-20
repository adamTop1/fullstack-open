import { useSelector, useDispatch } from 'react-redux'
import { addAnecdote } from './reducers/anecdoteReducer'
import { useRef } from 'react'

const App = () => {
	const anecdotes = useSelector(state => state)
	const dispatch = useDispatch()
	const anecdoteInput = useRef()

	const vote = id => {
		dispatch({
			type: 'VOTE',
			data: { id },
		})
	}

	const addNewAnecode = e => {
		e.preventDefault()
		dispatch(addAnecdote(anecdoteInput.current.value))
		anecdoteInput.current.value = ''
	}

	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotes.map(anecdote => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
			<h2>create new</h2>
			<form onSubmit={addNewAnecode}>
				<div>
					<input ref={anecdoteInput}/>
				</div>
				<button>create</button>
			</form>
		</div>
	)
}

export default App
