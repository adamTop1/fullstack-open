import Part from "./Part"

const Content = ({ name1, name2, name3, exercises1, exercises2, exercises3 }) => {
	return (
		<>
		<Part name={name1} exercises={exercises1}></Part>
		<Part name={name2} exercises={exercises2}></Part>
		<Part name={name3} exercises={exercises3}></Part>
		</>
	)
}

export default Content
