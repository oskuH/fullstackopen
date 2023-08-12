import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { useMatch, Routes, Route } from "react-router-dom";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import Users from "./components/Users";
import User from "./components/User";
import NaviBar from "./components/NavBar";
import blogService from "./services/blogs";

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const blogMatch = useMatch("/blogs/:id");
  const userMatch = useMatch("/users/:id");

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const user = useSelector(({ user }) => user);
  const blogMatchId = blogMatch ? blogMatch.params.id : null;
  const userMatchId = userMatch ? userMatch.params.id : null;

  if (user === null) {
    return (
      <div className="container">
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="container">
      <NaviBar user={user} />
      <h2>blog app</h2>
      <Notification />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm blogFormRef={blogFormRef} />
              </Togglable>
              <div className="listed-blogs">
                <BlogList />
              </div>
            </div>
          }
        />
        <Route
          path="blogs/:id"
          element={<Blog user={user} id={blogMatchId} />}
        />
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<User id={userMatchId} />} />
      </Routes>
    </div>
  );
};

export default App;
