const anecdotesAtStart = [
	{ content: 'If it hurts, do it more often', votes: 0 },
	{ content: 'Adding manpower to a late software project makes it later!', votes: 0 },
	{
		content:
			'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		votes: 0,
	},
	{
		content:
			'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		votes: 0,
	},
	{ content: 'Premature optimization is the root of all evil.', id: '5', votes: 0 },
	{
		content:
			'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		votes: 0,
	},
]

const getId = () => (100000 * Math.random()).toFixed(0)

const addId = anecdote => {
	return { ...anecdote, id: getId() }
}

const addAnecdote = content => {
	return {
		type: 'NEW_ANECDOTE',
		data: {
			content,
			id: getId(),
			votes: 0,
		},
	}
}

const initialState = anecdotesAtStart.map(addId)

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'VOTE': {
			const id = action.data.id
			const anecdoteToChange = state.find(a => a.id === id)
			const changedAnecdote = {
				...anecdoteToChange,
				votes: anecdoteToChange.votes + 1,
			}
			return state.map(anecdote => (anecdote.id !== id ? anecdote : changedAnecdote))
		}
    case 'NEW_ANECDOTE': {
      return [...state, action.data]
    }
	}

	return state
}

export { addAnecdote }
export default reducer
