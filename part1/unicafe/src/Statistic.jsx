import StatisticLine from "./StatisticLine"

const Statistic = ({ good, bad, neutral, total }) => {
	
    const average = ((good - bad) / total) + "%"
    const positive = ((good / total) * 100) + "%"
    
    if (total === 0) {
        return <h4>No feedback given</h4>
    }


	return (
		<>
			<h2>statistics</h2>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="total" value={total} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive} />
		</>
	)
}

export default Statistic
