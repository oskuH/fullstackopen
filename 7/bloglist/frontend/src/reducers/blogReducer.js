import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    likeBlog(state, action) {
      const id = action.payload;
      return state.map((blog) =>
        blog.id !== id ? blog : { ...blog, likes: blog.likes + 1 }
      );
    },
    commentBlog(state, action) {
      const { id, comment } = action.payload;
      return state.map((blog) =>
        blog.id !== id
          ? blog
          : { ...blog, comments: blog.comments.concat(comment) }
      );
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { setBlogs, appendBlog, likeBlog, commentBlog, deleteBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.create(content);
      dispatch(appendBlog(createdBlog));
    } catch (error) {
      dispatch(setNotification(error.response.data.error, "error"));
    }
  };
};

export const addLike = (id, blogObject) => {
  return async (dispatch) => {
    try {
      await blogService.like(id, blogObject);
      dispatch(likeBlog(id));
    } catch (error) {
      dispatch(setNotification(error.response.data.error, "error"));
    }
  };
};

export const addComment = (id, commentObject) => {
  return async (dispatch) => {
    try {
      await blogService.comment(id, commentObject);
      dispatch(commentBlog({ id, comment: commentObject.comment }));
    } catch (error) {
      dispatch(setNotification(error.response.data.error, "error"));
    }
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);
      dispatch(deleteBlog(id));
    } catch (error) {
      dispatch(setNotification(error.response.data.error, "error"));
    }
  };
};

export default blogSlice.reducer;
