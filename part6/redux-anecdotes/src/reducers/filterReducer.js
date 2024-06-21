const filterReducer = (state = '', action) => {
	switch (action.type) {
		case 'SET_FILTER': {
            return action.data
		}
	}
	return state
}

export default filterReducer
