import axios from 'axios'

const getCoordinates = (country, apikey) => {
  const request = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital[0]},
  ${country.cca2}&limit=1&appid=${apikey}`)
  return request.then(response => response.data)
}

const getWeather = (coordinates, apikey) => {
  const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&units=metric&appid=${apikey}`)
  return request.then(response => response.data)
}

export default { getCoordinates, getWeather }