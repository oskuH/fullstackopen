import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => anecdotes.filter(anecdote => anecdote.content.includes(filter)))
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    const timeoutId = setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
    dispatch(addVote(anecdote))
    dispatch(setNotification({
      content: `you voted '${anecdote.content}'`,
      timeoutId
    }))
  }

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList