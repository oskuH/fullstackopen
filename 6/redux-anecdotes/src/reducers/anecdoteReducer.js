import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      const content = action.payload
      return state.map(anecdote =>
        anecdote.id !== content.id ? anecdote : content)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { setAnecdotes, updateAnecdote, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const addedAnecdote = await anecdoteService.addNew(content)
    dispatch(appendAnecdote(addedAnecdote))
  }
}

export const addVote = (anecdote) => {
  const updatedAnecdote = {
    content: anecdote.content,
    votes: anecdote.votes + 1,
    id: anecdote.id
  }
  return async dispatch => {
    const votedAnecdote = await anecdoteService.update(anecdote.id, updatedAnecdote)
    dispatch(updateAnecdote(votedAnecdote))
  }
}

export default anecdoteSlice.reducer