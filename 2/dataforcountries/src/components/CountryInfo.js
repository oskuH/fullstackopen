const Language = ({ lang }) => {
  return (
    <li>{lang}</li>
  )
}

const Weather = ({ country, weather, errorFree }) => {
  if (errorFree) {
    return (
      <div>
        <h2>Weather in {country.capital[0]}</h2>
        <div>temperature {weather.main.temp} Celcius</div>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather Icon" />
        <div>wind {weather.wind.speed} m/s</div>
      </div>
    )
  }
}

const CountryInfo = ({ countries, weather, errorFree }) => {
  if (countries.length === 1 && weather) {
    const country = countries[0]
    const languageList = Object.values(country.languages)
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>
        <h3>languages</h3>
        <ul>
          {languageList.map(language =>
            <Language key={language} lang={language} />)}
        </ul>
        <div style={{ fontSize: '6rem' }}>{country.flag}</div>
        <Weather country={country} weather={weather} errorFree={errorFree} />
      </div>
    )
  }
}

export default CountryInfo