import { useState } from 'react'

const Title = (props) => <h1>{props.text}</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticLine = (props) => {
  return (
    <>
      <td>{props.rating}</td>
      <td>{props.count}</td>
    </>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <Title text='statistics' />
        No feedback given
      </div>
    )
  }
  return (
    <>
      <div>
        <Title text='statistics' />
      </div>
      <table>
        <tbody>
          <tr><StatisticLine rating='good' count={props.good} /></tr>
          <tr><StatisticLine rating='neutral' count={props.neutral} /></tr>
          <tr><StatisticLine rating='bad' count={props.bad} /></tr>
          <tr><StatisticLine rating='all' count={props.all} /></tr>
          <tr><StatisticLine rating='average' count={((props.good - props.bad)/props.all).toFixed(1)} /></tr>
          <tr><StatisticLine rating='positive' count={(100*(props.good/props.all)).toFixed(1) + ' %'} /></tr>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + neutral + bad

  return (
    <div>
      <Title text='give feedback' />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App