import { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([{ name: 'Arto Hellas', id: 1 }])
	const [newName, setNewName] = useState('')

	const addPerson = event => {
		event.preventDefault()

		const personObject = {
			name: newName,
      id: Math.floor(Math.random() * 1000),
		}

		setPersons(persons.concat(personObject))
	}

	const handleChange = event => {
		event.preventDefault()
		setNewName(event.target.value)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addPerson}>
				<div>
					name: <input onChange={handleChange} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map(person => (
				<p key={person.id}>{person.name}</p>
			))}
		</div>
	)
}

export default App
