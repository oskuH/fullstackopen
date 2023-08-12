import { createSlice } from "@reduxjs/toolkit";

const nullState = { message: null, nType: null, timeoutId: null };

const notificationSlice = createSlice({
  name: "notification",
  initialState: nullState,
  reducers: {
    showNotification(state, action) {
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }
      return {
        message: action.payload.message,
        nType: action.payload.nType,
        timeoutId: action.payload.timeoutId,
      };
    },
    removeNotification(state, action) {
      return nullState;
    },
  },
});

export const { showNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (message, nType, seconds = 5) => {
  return (dispatch) => {
    const timeoutId = setTimeout(() => {
      dispatch(removeNotification());
    }, seconds * 1000);
    dispatch(showNotification({ message, nType, timeoutId }));
  };
};

export default notificationSlice.reducer;
