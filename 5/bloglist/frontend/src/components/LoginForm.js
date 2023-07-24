import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin, username, handleUsernameChange, password, handlePasswordChange
}) => (
  <form onSubmit={handleLogin}>
    <div>
      <h2>log in to application</h2>
      username
      <input
        className='username-input'
        type='text'
        value={username}
        name='Username'
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      password
      <input
        className='password-input'
        type='password'
        value={password}
        name='Password'
        onChange={handlePasswordChange}
      />
    </div>
    <button className='login-button' type='submit'>login</button>
  </form>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  handlePasswordChange: PropTypes.func.isRequired
}

export default LoginForm