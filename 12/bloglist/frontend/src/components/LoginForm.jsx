import PropTypes from 'prop-types';

const LoginForm = ({
  handleLogin, username, handleUsernameChange, password, handlePasswordChange
}) => (
  <form onSubmit={handleLogin}>
    <div>
      <h2>log in to application</h2>
      <label htmlFor="username">username</label>
      <input
        className="username-input"
        type="text"
        value={username}
        name="Username"
        id="username"
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      <label htmlFor="password">password</label>
      <input
        className="password-input"
        type="password"
        value={password}
        name="Password"
        id="password"
        onChange={handlePasswordChange}
      />
    </div>
    <button className="login-button" type="submit">login</button>
  </form>
);

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  handlePasswordChange: PropTypes.func.isRequired
};

export default LoginForm;