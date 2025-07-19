import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import {Link} from "react-router";
import { useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLanguage } from '../store/store';

function AppNavbar() {
  const location = useLocation();
  const language = useSelector((state) => state.language.value);
  const dispatch = useDispatch();

  const handleToggleLanguage = () => {
    dispatch(toggleLanguage());
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">WEBSITE_TITLE</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto"> {/* Use ms-auto to push links to the right */}
            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" active={location.pathname === '/`about'}>About</Nav.Link>
            <NavDropdown title="Dashboard" id="dashboard-dropdown">
              <NavDropdown.Item as={Link} to="/dash?type=custom" active={location.pathname === '/dash?type=custom'}>Custom</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/dash?type=pilots" active={location.pathname === '/dash?type=pilots'}>Pilots</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/dash?type=race" active={location.pathname === '/dash?type=race'}>Race</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/dash?type=seasons" active={location.pathname === '/dash?type=seasons'}>Seasons</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={handleToggleLanguage}>{language.toUpperCase()}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
