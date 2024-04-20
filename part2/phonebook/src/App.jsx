import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [inputSearch, setInputSearch] = useState('')

	useEffect(() => {
		personService.getAll().then(persons => {
			setPersons(persons)
		})
	}, [])

	const searchPerson = event => {
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
			id: Math.floor(Math.random() * 1000).toString()
		}

		personService.create(personObject).then(returnedPerson => {
		setPersons(persons.concat(returnedPerson))
		setNewName('')
		setNewNumber('')
		})
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
			<PersonForm
				addPerson={addPerson}
				handleChangeName={handleChangeName}
				handleChangeNumber={handleChangeNumber}
				newName={newName}
				newNumber={newNumber}
			/>
			<Persons filteredPersons={filteredPersons} setPersons={setPersons} persons={persons} />
		</div>
	)
}

export default App
