import { useDispatch } from "react-redux";
import { removeNotification } from "../reducers/notificationReducer";
import { setUser } from "../reducers/userReducer";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NaviBar = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(removeNotification());
    dispatch(setUser(null));
  };

  return (
    <Navbar
      collapseOnSelect
      bg="light"
      expand="lg"
      style={{ marginBottom: 10 }}
    >
      <Nav className="me-auto" style={{ marginLeft: 5 }}>
        <Nav.Link href="#" as="span">
          <Link to={"/"}>blogs</Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          <Link to={"users"} style={{ marginRight: 8 }}>
            users
          </Link>
        </Nav.Link>
      </Nav>
      <Nav style={{ marginRight: 5 }}>
        <Navbar.Text className="logged-user" style={{ marginRight: 5 }}>
          {user.name} logged in
        </Navbar.Text>
        <Button
          id="log-out-button"
          onClick={handleLogout}
          style={{ marginRight: 5 }}
        >
          logout
        </Button>
      </Nav>
    </Navbar>
  );
};

export default NaviBar;
