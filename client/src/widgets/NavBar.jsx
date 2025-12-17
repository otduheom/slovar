import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router";
import axios from "axios";

function NavBar({ user, setUser }) {
  const signoutHandler = async () => {
    await axios.delete("./api/auth/signout");
    setUser(null);
  };

  console.log(user);

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Эльбрус переписка</Navbar.Brand>
        <Nav className="me-auto">
          <p style={{ color: "white" }}>Привет, {user ? user.name : "Гость"}</p>
          <Nav.Link as={Link} to="/">
            Домой
          </Nav.Link>
          <Nav.Link as={Link} to="/messages">
            Сообщения
          </Nav.Link>
          {!user ? (
            <>
              {" "}
              <Nav.Link as={Link} to="/signup">
                Регистрация
              </Nav.Link>
              <Nav.Link as={Link} to="/signin">
                Войти
              </Nav.Link>
            </>
          ) : (
            <button onClick={signoutHandler}>Выйти</button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
