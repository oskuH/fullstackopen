import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../reducers/notificationReducer'
import filterReducer from '../reducers/filterReducer'
import anecdoteReducer from '../reducers/anecdoteReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    filter: filterReducer,
    anecdotes: anecdoteReducer
  }
})

export default store