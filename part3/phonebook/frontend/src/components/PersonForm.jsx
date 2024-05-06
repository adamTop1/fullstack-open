import React from 'react'
import personService from '../services/persons'

const PersonForm = ({ newName, newNumber, setNewName, setNewNumber, persons, setPersons, setErrorMessage }) => {
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
			if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) === true) {
				const person = persons.find(person => person.name === newName)
				personService
					.update(person.id, { ...person, number: newNumber })
					.then(returnedPerson => {
						setNewName('')
						setNewNumber('')

						const updatedPersons = persons.map(person =>
							person.id !== returnedPerson.data.id ? person : returnedPerson.data
						)
						setPersons(updatedPersons)

						setErrorMessage(`Successfully updated ${returnedPerson.data.name}'s number`)
						setTimeout(() => {
							setErrorMessage(null)
						}, 5000)
						return
					})
					.catch(error => {
						setNewName('')
						setNewNumber('')
						setErrorMessage(null)
						setErrorMessage(error.response.data.error)
						setTimeout(() => {
							setErrorMessage(null)
						}, 5000)
					})
			}
		} else {
			const personObject = {
				name: newName,
				number: newNumber,
				id: Math.floor(Math.random() * 1000).toString(),
			}

			personService
				.create(personObject)
				.then(returnedPerson => {
					setPersons(persons.concat(returnedPerson))
					setNewName('')
					setNewNumber('')
					setErrorMessage(null)
					setErrorMessage(`Successfully added ${personObject.name} to phonebook`)
					setTimeout(() => {
						setErrorMessage(null)
					}, 5000)
				})
				.catch(error => {
					setNewName('')
					setNewNumber('')
					setErrorMessage(error.response.data.error)
					setTimeout(() => {
						setErrorMessage(null)
					}, 5000)
				})
		}
	}

	return (
		<>
			<h3>add a new</h3>
			<form onSubmit={addPerson}>
				<div>
					name: <input onChange={handleChangeName} value={newName} />
				</div>
				<div>
					number: <input onChange={handleChangeNumber} value={newNumber} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
		</>
	)
}

export default PersonForm
