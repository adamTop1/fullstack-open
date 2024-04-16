import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


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
			<Filter searchPerson={searchPerson} />
			<PersonForm addPerson={addPerson} handleChangeName={handleChangeName} handleChangeNumber={handleChangeNumber} />
			<Persons filteredPersons={filteredPersons} />
		</div>
	)
}

export default App
