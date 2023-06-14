import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import CountryList from './components/CountryList'
import CountryInfo from './components/CountryInfo'
import countryService from './services/countries'
import weatherService from './services/weather'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [weatherInfo, setWeatherInfo] = useState(null)
  const [errorFree, setErrorFree] = useState(true)
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    countryService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
      })
  }, [])

  const handleFilterChange = (event) => {
    if (event.target.value === '') {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
    setNewFilter(event.target.value)
  }

  const countriesToShow = showAll
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  useEffect(() => {
    if (countriesToShow.length === 1) {
      pullWeather(countriesToShow)
    }
  }, [newFilter])

  const showCountry = name => {
    setNewFilter(name)
  }

  const pullCoordinates = async (country) => {
    try {
      const response = await weatherService.getCoordinates(country,api_key)
      return [response[0].lat.toFixed(2),response[0].lon.toFixed(2)]
    } catch (error) {
      console.error(`Error pulling coordinates.`)
      return 'error'
    }
  }
  
  const pullWeather = async (countries) => {
    if (countries.length !== 1) {
      return []
    } else {
      const coordinates = await pullCoordinates(countries[0])
      if (coordinates !== 'error') {
        setErrorFree(true)
        weatherService
          .getWeather(coordinates, api_key)
          .then(returnedWeather => setWeatherInfo(returnedWeather))
      } else {
        console.error('Error pulling weather: Coordinates unavailable.')
        setErrorFree(false)
      }
    }
  }

  if (api_key !== 'insert_key') {
    return (
      <div>
        <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
        <CountryList countries={countriesToShow} showCountry={showCountry} />
        <CountryInfo countries={countriesToShow} weather={weatherInfo} errorFree={errorFree} />
      </div>
    )
  } else {
    return (
      <div>Openweather API key required! Please edit .env.</div>
    )
  }
}

export default App;