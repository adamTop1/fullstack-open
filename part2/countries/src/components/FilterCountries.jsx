import React from 'react'
import OneCountry from './OneCountry'

const FilterCountries = ({ setSearch, filteredCountries }) => {
	let content

	const showAllInfo = name => {
		setSearch(name)
	}

	if (filteredCountries.length === 1) {
		content = filteredCountries.map(country => <OneCountry key={country.name.common} country={country} />)
	} else if (filteredCountries.length > 10) {
		content = <p>Too many matches, specify another filter</p>
	} else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
		content = filteredCountries.map(country => (
			<p key={country.name.common}>
				{country.name.common}
				<button onClick={() => showAllInfo(country.name.common)}>show</button>
			</p>
		))
	} else {
		content = <p>No matches, specify another filter</p>
	}

	return <>{content}</>
}

export default FilterCountries
