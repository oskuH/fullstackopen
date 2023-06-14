const Person = ({ id, person, number, deleteName }) => {
  return (
    <div>
      {person} {number} <button onClick={() => deleteName(id, person)}>delete</button>
    </div>
  )
}

const Persons = ({ personsToShow, deleteName }) => {
  return (
    <div>
      {personsToShow.map(person => 
        <Person key={person.id} id={person.id} person={person.name} number={person.number} deleteName={deleteName} />
      )}
    </div>
  )
}

export default Persons