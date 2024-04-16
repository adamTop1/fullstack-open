import { useState, useRef } from 'react'


const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	  ])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [inputSearch, setInputSearch] = useState('');
	
	const searchPerson = (event) => {
		if (event.target.value === '' || event.target.value === null) {
			return setInputSearch('')
		}
		setInputSearch(event.target.value)
	}
	const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(inputSearch))
	
	const addPerson = event => {
		event.preventDefault()

		if (persons.find(person => person.name === newName)) {
			alert(`${newName} is already added to phonebook`)
			return
		}

		const personObject = {
			name: newName,
			number: newNumber,
			id: Math.floor(Math.random() * 1000),
		}

		setPersons(persons.concat(personObject))
	}

	const handleChangeName = event => {
		event.preventDefault()
		setNewName(event.target.value)
	}

	const handleChangeNumber = event => {
		event.preventDefault()
		setNewNumber(event.target.value)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<p>filter shown with</p><input type="text" onChange={searchPerson} />
			<h3>add a new</h3>
			<form onSubmit={addPerson}>
				<div>
					name: <input onChange={handleChangeName} />

				</div>
				<div>
					number: <input type='number' onChange={handleChangeNumber} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{filteredPersons.map(person => (
				<p key={person.id}>{person.name} {person.number}</p>
			))}
		</div>
	)
}

export default App
