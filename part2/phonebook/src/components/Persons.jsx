import React from 'react'
import personService from '../services/persons'

const Persons = ({ filteredPersons, setPersons, persons }) => {
	const deletePerson = id => {
		personService.remove(id)
		setPersons(persons.filter(person => person.id !== id))
	}

	return (
		<>
			<h2>Numbers</h2>
			{filteredPersons.map(person => (
				<div key={person.id}>
					<p>
						{person.name} {person.number}
					</p>
					<button onClick={() => deletePerson(person.id)}>delete</button>
				</div>
			))}
		</>
	)
}

export default Persons