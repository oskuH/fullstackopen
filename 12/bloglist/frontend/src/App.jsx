import { useState, useEffect, useRef } from 'react';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import ErrorNotification from './components/ErrorNotification';
import LoginForm from './components/LoginForm';
import SuccessNotification from './components/SuccessNotification';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username, password
      });

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setErrorMessage(null);
    } catch (exception) {
      setUsername('');
      setPassword('');
      setErrorMessage('wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog));
        setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      })
      .catch(error => {
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const updateBlog = (id, blogObject) => {
    blogService
      .update(id, blogObject)
      .then(returnedBlog => {
        const updatedBlogs = blogs.map((blog) =>
          blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog);
        setBlogs(updatedBlogs);
      })
      .catch(error => {
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const removeBlog = (id) => {
    blogService
      .remove(id)
      .then(returnedBlog => {
        const updatedBlogs = blogs.filter((blog) =>
          blog.id !== id);
        setBlogs(updatedBlogs);
      })
      .catch(error => {
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const loginForm = () => (
    <LoginForm
      handleLogin={handleLogin}
      username={username}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      password={password}
      handlePasswordChange={({ target }) => setPassword(target.value)}
    />
  );

  if (user === null) {
    return (
      <div>
        <ErrorNotification message={errorMessage} />
        {loginForm()}
      </div>
    );
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const blogListStyle = {
    listStyleType: 'none'
  };

  return (
    <div>
      <h2>blogs</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <p>
        <output className="logged-user" id="logged-user">{user.name} logged in</output>
        <button id="log-out-button" onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm addBlog={createBlog} />
      </Togglable>
      <ol className="listed-blogs" style={blogListStyle}>
        {sortedBlogs
          .map(blog =>
            <li key={blog.id}><Blog blog={blog} updateBlog={updateBlog} user={user} deleteBlog={removeBlog}/></li>
          )}
      </ol>
    </div>
  );
};

export default App;