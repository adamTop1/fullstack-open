import React from 'react'

const Filter = ({setInputSearch}) => {

	const searchPerson = event => {
		if (event.target.value === '' || event.target.value === null) {
			return setInputSearch('')
		}
		setInputSearch(event.target.value)
	}

	return (
		<>
			<p>filter shown with</p>
			<input type='text' onChange={searchPerson} />
		</>
	)
}

export default Filter