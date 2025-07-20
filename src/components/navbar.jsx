import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from "react-router";
import { useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLanguage } from '../store/store';
import translations from '../data/lang.jsx';
import React from "react";

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
        <Navbar.Brand as={Link} to="/">
          <h4 className="fw-bold brand-title mb-1">
            <i className="bi bi-speedometer2 me-2"></i>
            GP-Statz
          </h4>
        </Navbar.Brand>
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
      <style>{`
      .brand-title {
        // background: linear-gradient(90deg,var(--bs-primary),var(--bs-info) 80%);
        -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
        color: black;
        background-clip: text;
      }
    `}</style>
    </Navbar>
  );
}

export default AppNavbar;
