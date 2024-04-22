import React from 'react'
import { useState, useEffect } from 'react'
import FilterCountries from './components/FilterCountries'

const App = () => {
	const [countries, setCountries] = useState([])
	const [search, setSearch] = useState('')

	useEffect(() => {
		fetch('https://restcountries.com/v3.1/all')
			.then(response => response.json())
			.then(data => setCountries(data))
	}, [])

	const filteredCountries = countries.filter(country =>
		country.name.common.toLowerCase().includes(search.toLowerCase())
	)

	const searchCountry = event => {
		event.preventDefault()
		setSearch(event.target.value)
	}

	return (
		<>
			<div>
				<p>
					find countries <input type='text' value={search} onChange={searchCountry} />
				</p>
				<FilterCountries filteredCountries={filteredCountries} setSearch={setSearch} />
			</div>
		</>
	)
}

export default App
