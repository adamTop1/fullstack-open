const Statistic = ({good, bad, total}) => {

    if (total === 0) {
        return (
            <h4>No feedback given</h4>
        )
    }

	return (
		<>
			<p>total {total}</p>
			<p>average {(good - bad) / total}%</p>
			<p>positive {(good / total) * 100}%</p>
		</>
	)
}

export default Statistic
