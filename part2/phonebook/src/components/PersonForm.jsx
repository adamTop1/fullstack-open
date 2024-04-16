import React from 'react'

const PersonForm = ({addPerson, handleChangeName, handleChangeNumber}) => {
	return (
		<>
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
		</>
	)
}

export default PersonForm
