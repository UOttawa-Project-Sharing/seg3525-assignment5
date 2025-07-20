import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from "react-router";
import { useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLanguage } from '../store/store';
import translations from '../data/lang.jsx';

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
        <Navbar.Brand as={Link} to="/">GP-Statz</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto"> {/* Use ms-auto to push links to the right */}
            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>{translations[language].navbar.home}</Nav.Link>
            <Nav.Link as={Link} to="/about" active={location.pathname === '/about'}>{translations[language].navbar.about}</Nav.Link>
            <Nav.Link as={Link} to="/dash" active={location.pathname.startsWith('/dash')}>{translations[language].navbar.dashboard}</Nav.Link>
            <Nav.Link onClick={handleToggleLanguage}>{language === 'en' ? (<>FR</>) : (<>EN</>)}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
