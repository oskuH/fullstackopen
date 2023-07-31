import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteList = ({ voteAnecdoteMutation, anecdotes }) => {
  const dispatch = useNotificationDispatch()

  const handleVote = (anecdote) => {
    const updatedAnecdote = {
      content: anecdote.content,
      votes: anecdote.votes + 1
    }
    dispatch({ type: 'SHOW', payload: `anecdote '${anecdote.content}' voted` })
    voteAnecdoteMutation.mutate({ id: anecdote.id, updatedAnecdote: updatedAnecdote })
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList