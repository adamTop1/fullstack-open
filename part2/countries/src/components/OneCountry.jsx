import React from 'react'
import Weather from './Weather'

const OneCountry = ({country}) => {

	return (
		<div key={country.name.common}>
			<h1>{country.name.common}</h1>
			<p>capital {country.capital}</p>
			<p>population {country.population}</p>
			<h2>languages</h2>
			{Object.values(country.languages).map(language => (
				<li key={language}>{language}</li>
			))}
			<img src={country.flags.png} alt={country.name.common} width='200' height='100' />
            <Weather lat={country.latlng[0]} lon={country.latlng[1]} />
		</div>
	)
}

export default OneCountry
