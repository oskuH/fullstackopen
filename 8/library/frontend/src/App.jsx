import { useState } from 'react';
import { 
  BrowserRouter as Router,
  Routes, Route, Link, Navigate,
} from 'react-router-dom'
import { useApolloClient, useSubscription } from '@apollo/client';
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm"
import NewBook from "./components/BookForm";
import Recommendations from "./components/Recommendations"
import { ALL_BOOKS, BOOK_ADDED, BOOKS_BY_GENRE } from './queries';
import { updateCache } from './Utils';

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const padding = {
    padding: 5
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()

    const currentPath = window.location.pathname;

    if (currentPath == '/add' || currentPath == '/recommendations') {
      window.location.href = '/books'
    }
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
      updateCache(client.cache, { query: BOOKS_BY_GENRE, variables: { genreToSearch: '' } }, addedBook)
    }
  })

  return (
    <Router>
      <div>
        <Link style={padding} to="/authors">authors</Link>
        <Link style={padding} to="/books">books</Link>
        {token ? (
          <span>
          <Link style={padding} to="/add">add book</Link>
          <Link style={padding} to="/recommendations">recommend</Link>
          <Link style={padding} onClick={logout}>logout</Link>
          </span>
        ) : (
          <Link style={padding} to="/login">login</Link>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Navigate replace to="/books" />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
      </Routes>
    </Router>
  );
};

export default App;