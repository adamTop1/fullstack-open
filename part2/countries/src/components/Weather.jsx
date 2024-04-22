import React from 'react'
import { useEffect, useState } from 'react'

const Weather = ({ lat, lon }) => {
	const [dataWeather, setDataWeather] = useState('')

	const apikey = import.meta.env.VITE_KEY

	useEffect(() => {
		fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`)
			.then(response => response.json())
			.then(data => setDataWeather(data))
	}, [])
	const celcius = dataWeather.main ? (dataWeather.main.temp - 273.15).toFixed(2) : null
    const img = dataWeather.weather ? `http://openweathermap.org/img/w/${dataWeather.weather[0].icon}.png` : null
	return (
		<div>
			<h2>Weather</h2>
            <p>temperature {celcius} Celcius</p>
            {img && <img src={img} alt='weather' />}
            <p>wind {dataWeather.wind ? dataWeather.wind.speed : null} m/s</p>
		</div>
	)
}

export default Weather
