const Country = ({ name, showCountry }) => {
  return (
    <div>
      {name}
      <button onClick={() => showCountry(name)}>show</button>
    </div>
  )
}

const CountryList = ({ countries, showCountry }) => {
  const names = countries.map(country => country.name.common)
  if (names.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (names.length === 1) {
    return
  } else {
    return (
      <div>
        {names.map(name => <Country key={name} name={name} showCountry={showCountry}/>)}
      </div>
    )
  }
}

export default CountryList