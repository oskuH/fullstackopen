const Header = ({ header }) => <h2>{header}</h2>

const Part = ({ name, exercises }) => {
  return (
    <p>{name} {exercises}</p>
  )
}

const Total = ({ content }) => {
  const exercises = content.map(part => part.exercises)
  const sum = exercises.reduce((acc, curr) => acc + curr)
  return (
    <p><strong>total of {sum} exercises</strong></p>
  )
}

const Content = ({ content }) => {
  return (
    <div>
      {content.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
      <Total content={content} />
    </div>
  )
}

const Course = (props) => {
    return (
      <div>
        <Header header={props.course.name} />
        <Content content={props.course.parts} />
      </div>
    )
}

export default Course