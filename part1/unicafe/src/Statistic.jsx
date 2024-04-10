const Statistic = ({good, bad, total}) => {
	return (
		<>
			<p>total {total}</p>
			<p>average {(good - bad) / total}%</p>
			<p>positive {(good / total) * 100}%</p>
		</>
	)
}

export default Statistic
