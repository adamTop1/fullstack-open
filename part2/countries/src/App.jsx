import React from 'react'
import { useState, useEffect } from 'react'

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

	let content

	const showAllInfo = name => {
		setSearch(name)
	}

	if (filteredCountries.length === 1) {
		content = filteredCountries.map(country => (
			<div key={country.name.common}>
				<h1>{country.name.common}</h1>
				<p>capital {country.capital}</p>
				<p>population {country.population}</p>
				<h2>languages</h2>
				{Object.values(country.languages).map(language => (
					<li key={language}>{language}</li>
				))}
				<img src={country.flags.png} alt={country.name.common} width='200' height='100' />
			</div>
		))
	} else if (filteredCountries.length > 10) {
		content = <p>Too many matches, specify another filter</p>
	} else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
		content = filteredCountries.map(country => (
			<div key={country.name.common}>
				<p>
					{country.name.common}
					<button onClick={() => showAllInfo(country.name.common)}>show</button>
				</p>
			</div>
		))
	} else {
		content = <p>No matches, specify another filter</p>
	}

	return (
		<>
			<div>
				<p>
					find countries <input type='text' value={search} onChange={searchCountry} />
				</p>
				{content}
			</div>
		</>
	)
}

export default App
