import React from 'react'

const PersonForm = ({addPerson, handleChangeName, handleChangeNumber, newName, newNumber}) => {
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
