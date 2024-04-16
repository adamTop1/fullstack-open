import React from 'react'

const Filter = ({searchPerson}) => {
	return (
		<>
			<h2>Phonebook</h2>
			<p>filter shown with</p>
			<input type='text' onChange={searchPerson} />
		</>
	)
}

export default Filter
