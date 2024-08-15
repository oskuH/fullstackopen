import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, loginResult ] = useMutation(LOGIN)
  const navigate = useNavigate()

  useEffect(() => {
    if ( loginResult.data ) {
      const token = loginResult.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      navigate('/books')
    }
  }, [loginResult.data, navigate, setToken])

  const submit = async (event) => {
    event.preventDefault()
    try {
      await login({ variables: { username, password } })
    } catch (error) {
      console.error('Login failed:', error.message)
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm