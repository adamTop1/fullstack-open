import React from 'react'
import personService from '../services/persons'

const PersonForm = ({ newName, newNumber, setNewName, setNewNumber, persons, setPersons, setErrorMessage, setIsGoodMessage }) => {

	
	const handleChangeName = event => {
		event.preventDefault()
		setNewName(event.target.value)
	}

	const handleChangeNumber = event => {
		event.preventDefault()
		setNewNumber(event.target.value)
	}

	const addPerson = event => {
		event.preventDefault()

		if (persons.find(person => person.name === newName)) {
			alert(`${newName} is already added to phonebook`)
			return
		}

		if (persons.find(person => person.number === newNumber)) {
			if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) === true) {
				const person = persons.find(person => person.number === newNumber)
				personService.update(person.id, { ...person, name: newName })
				.then(returnedPerson => {
					console.log('updated person', returnedPerson);
					setPersons(persons.map(person => (person.id !== returnedPerson.id ? person : returnedPerson)))
					setNewName('')
					setNewNumber('')
				})
				.catch(error => {
					setErrorMessage(`Information of ${newName} has already been removed from server`)
					setTimeout(() => {
						setErrorMessage(null)
					}, 5000)
				})
			}
			return
		}

		const personObject = {
			name: newName,
			number: newNumber,
			id: Math.floor(Math.random() * 1000).toString(),
		}

		personService.create(personObject).then(returnedPerson => {
			setPersons(persons.concat(returnedPerson))
			setNewName('')
			setNewNumber('')
			setErrorMessage(`Successfully added ${personObject.name} to phonebook`)
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		})
	}

	return (
		<>
			<h3>add a new</h3>
			<form onSubmit={addPerson}>
				<div>
					name: <input onChange={handleChangeName} value={newName} />
				</div>
				<div>
					number: <input type='number' onChange={handleChangeNumber} value={newNumber} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
		</>
	)
}

export default PersonForm
