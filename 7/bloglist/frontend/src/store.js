import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";
import blogReducer from "./reducers/blogReducer";
import usersReducer from "./reducers/usersReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    blogs: blogReducer,
    users: usersReducer,
  },
});

export default store;
