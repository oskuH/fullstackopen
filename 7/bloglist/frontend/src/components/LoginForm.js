import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";
import {
  removeNotification,
  setNotification,
} from "../reducers/notificationReducer";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { Form, Button } from "react-bootstrap";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
      dispatch(removeNotification());
    } catch (error) {
      setUsername("");
      setPassword("");
      dispatch(setNotification(error.response.data.error, "error"));
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h2>log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label style={{ marginTop: 10 }}>username</Form.Label>
          <Form.Control
            className="username-input"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            placeholder="Enter username"
          />
          <Form.Label style={{ marginTop: 15 }}>password</Form.Label>
          <Form.Control
            className="password-input"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Password"
          />
          <Button
            className="login-button"
            type="submit"
            style={{ marginTop: 20 }}
          >
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginForm;
