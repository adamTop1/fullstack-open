import Part from "./Part"

const Content = ({parts}) => {
	
	// We sum the exercises of each part to get the total number of exercises
	const total = parts.reduce((sum, part) => sum + part.exercises, 0)

	return (
		<>
		{parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}></Part>)}
		<p><strong>total of {total} exercises</strong></p>
		</>
	)
}

export default Content
