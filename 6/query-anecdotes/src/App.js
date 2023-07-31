import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    }
  })

  const voteAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      const anecdotesAfterVote = anecdotes.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote)
      queryClient.setQueryData('anecdotes', anecdotesAfterVote)
    }
  })

  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h2>Anecdote app</h2>
    
      <Notification />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} />
      <AnecdoteList voteAnecdoteMutation={voteAnecdoteMutation} anecdotes={anecdotes} />
    </div>
  )
}

export default App
