import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [inputSearch, setInputSearch] = useState('')
	const [errorMessage, setErrorMessage] = useState(null)

	useEffect(() => {
		personService.getAll().then(persons => {
			setPersons(persons)
		})
	}, [])

	const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(inputSearch))

	return (
		<div>
			<h2>PhoneBook</h2>
			<Notification message={errorMessage}/>
			<Filter setInputSearch={setInputSearch} />
			<PersonForm
				persons={persons}
				setPersons={setPersons}
				setNewName={setNewName}
				setNewNumber={setNewNumber}
				newName={newName}
				newNumber={newNumber}
				setErrorMessage={setErrorMessage}
			/>
			<Persons filteredPersons={filteredPersons} setPersons={setPersons} persons={persons} />
		</div>
	)
}

export default App