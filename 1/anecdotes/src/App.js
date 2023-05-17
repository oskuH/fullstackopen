import { useState } from 'react'

const Title = (props) => <h1>{props.value}</h1>

const AnecdoteDisplay = (props) => <div>{props.value}</div>

const VoteDisplay = (props) => <div>has {props.value} votes</div>

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const Vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    return (
      () => setVotes(copy)
    )
  }
  let maxIndex = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <Title value='Anecdote of the day' />
      <AnecdoteDisplay value={anecdotes[selected]} />
      <VoteDisplay value={votes[selected]} />
      <Button handleClick={Vote()} text='vote' />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text='next anecdote' />
      <Title value='Anecdote with most votes' />
      <AnecdoteDisplay value={anecdotes[maxIndex]} />
      <VoteDisplay value={votes[maxIndex]} />
    </div>
  )
}

export default App;
