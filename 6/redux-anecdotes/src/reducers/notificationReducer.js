import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: null,
  timeoutId: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      if (state.timeoutId) {
        clearTimeout(state.timeoutId)
      }
      return {
        content: action.payload.content,
        timeoutId: action.payload.timeoutId
      }
    },
    removeNotification() {
      return initialState
    }
  }
})

export const { showNotification, removeNotification } = notificationSlice.actions

export const setNotification = (content, seconds) => {
  const timeoutId = setTimeout(() => {
    removeNotification();
  }, seconds*100);
  return async dispatch => {
    dispatch(showNotification(content, timeoutId))
  }
}

export default notificationSlice.reducer